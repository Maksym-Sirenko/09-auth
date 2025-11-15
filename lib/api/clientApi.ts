// lib/api/clientApi.ts
import { api } from './api';
import { NoteListResponse, Note, NoteTag } from '@/types/note';
import { User } from '@/types/user';

export type RegisterRequest = {
  email: string;
  password: string;
  userName?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};

export type UpdateUserRequest = {
  userName?: string;
};

export interface FetchNotesParams {
  search: string;
  tag?: string;
  page: number;
  perPage: number;
}

// --- Notes ---
export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<NoteListResponse> => {
  const { search, tag, page, perPage } = params;

  const { data } = await api.get<NoteListResponse>('/notes', {
    params: {
      search,
      tag: tag || '',
      page,
      perPage,
    },
  });
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
};

export const createNote = async (data: NewNoteData): Promise<Note> => {
  const { data: res } = await api.post<Note>('/notes', data);
  return res;
};

export const deleteNote = async (noteId: string): Promise<void> => {
  await api.delete(`/notes/${noteId}`);
};

// --- Auth / Users ---
export const register = async (data: RegisterRequest): Promise<User> => {
  const { data: user } = await api.post<User>('/auth/register', data);
  return user;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const { data: user } = await api.post<User>('/auth/login', data);
  return user;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<User>('/auth/session');
    return data;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const { data: user } = await api.patch<User>('/users/me', data);
  return user;
};
