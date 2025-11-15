// app/types/note.ts
import { TAGS } from '@/lib/constants';
import { AxiosError } from 'axios';

export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NoteListResponse {
  notes: Note[];
  totalPages: number;
  total: number;
  page: number;
  perPage: number;
}

export type NoteFormValues = {
  title: string;
  content: string;
  tag: NoteTag;
};

export type CreateNoteInput = NoteFormValues;

export type NoteTag = (typeof TAGS)[number];

export type ApiError = AxiosError<{ error: string }>;
