// app/(private routes)/notes/[id]/NoteDetails.client.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import css from './NoteDetails.module.css';

const NoteDetailsClient = ({ noteId }: { noteId: string }) => {
  const isValidId = !!noteId && noteId.trim() !== '';

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
    enabled: isValidId,
    retry: 1,
  });

  if (!isValidId) {
    return <p>Invalid note ID</p>;
  }

  if (isLoading)
    return <div className={css.loading}>Loading note details...</div>;
  if (isError) return <div className={css.error}>Failed to load note</div>;
  if (!note) return <div className={css.error}>Note not found</div>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
