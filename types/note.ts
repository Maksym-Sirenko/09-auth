// app/types/note.ts

import { TAGS } from '@/lib/constants';
import { AxiosError } from 'axios';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type NoteTag = (typeof TAGS)[number];

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export type ApiError = AxiosError<{ error: string }>;
