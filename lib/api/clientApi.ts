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
  imageUrl?: string;
};

export interface FetchNotesParams {
  search: string;
  tag?: string;
  page: number;
  perPage: number;
}

// --- Notes ---
export const fetchNotes = async (params: FetchNotesParams) => {
  const { search, tag, page, perPage } = params;
  const token = localStorage.getItem('token');
  const query = new URLSearchParams({
    search,
    tag: tag || '',
    page: page.toString(),
    perPage: perPage.toString(),
  });
  const res = await fetch(`https://notehub-api.goit.study/notes?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
};

export const fetchNoteById = async (noteId: string) => {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
};

export const createNote = async (data: NewNoteData) => {
  const { data: res } = await api.post<Note>('/notes', data);
  return res;
};

export const deleteNote = async (noteId: string) => {
  await api.delete(`/notes/${noteId}`);
};

// --- Auth / Users ---
export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);
  try {
    return await getMe();
  } catch {
    return response.data;
  }
};

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await api.post<User>('/auth/login', data);
  try {
    return await getMe();
  } catch {
    return response.data;
  }
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const { data } = await api.get<User>('/auth/session');
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const { data: res } = await api.patch<User>('/users/me', data);
  return res;
};

// --- Upload ---
export const uploadUserImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<{ url: string }>('/upload', formData);
  return data.url;
};
