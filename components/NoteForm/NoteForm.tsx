'use client';

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { createNote } from '@/lib/api/clientApi';
import css from './NoteForm.module.css';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import { TAGS, NoteTag } from '@/lib/constants';
import { NoteFormValues, CreateNoteInput } from '@/types/note';

interface NoteFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title too short')
    .max(50, 'Title too long')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content is too long'),
  tag: Yup.mixed<NoteTag>().oneOf(TAGS).required('Tag is required'),
});

function isNoteTag(tag: string): tag is NoteTag {
  return TAGS.includes(tag as NoteTag);
}

const NoteForm = ({ onClose, onSuccess }: NoteFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateNoteInput) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      onSuccess?.();
      if (onClose) onClose();
      else router.push('/notes/filter/all');
    },
  });

  const handleSubmit = async (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>,
  ) => {
    await mutateAsync(values);
    actions.resetForm();
  };

  const initialDraftValues: NoteFormValues = {
    title: draft?.title ?? '',
    content: draft?.content ?? '',
    tag: draft?.tag ?? 'Todo',
  };

  return (
    <Formik
      initialValues={initialDraftValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ isValid }) => (
        <Form className={css.form} noValidate>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field name="title">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  id={`${fieldId}-title`}
                  className={css.input}
                  onChange={(e) => {
                    field.onChange(e);
                    setDraft({ ...draft, title: e.target.value });
                  }}
                />
              )}
            </Field>
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field name="content">
              {({ field }: FieldProps) => (
                <textarea
                  {...field}
                  id={`${fieldId}-content`}
                  className={css.textarea}
                  rows={8}
                  onChange={(e) => {
                    field.onChange(e);
                    setDraft({ ...draft, content: e.target.value });
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field name="tag">
              {({ field }: FieldProps) => (
                <select
                  {...field}
                  id={`${fieldId}-tag`}
                  className={css.select}
                  onChange={(e) => {
                    field.onChange(e);
                    const value = e.target.value;
                    if (isNoteTag(value)) setDraft({ ...draft, tag: value });
                  }}
                >
                  {TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                if (onClose) onClose();
                else router.push('/notes/filter/all');
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending || !isValid}
            >
              {isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
