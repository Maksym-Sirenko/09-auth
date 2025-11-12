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

// export type Tag = {
//   id: string;
//   name: string;
//   description?: string;
//   createdAt: string;
//   updatedAt: string;
// };

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};

export type UpdateUserRequest = {
  userName?: string;
  imageUrl?: string;
};

type CheckSessionRequest = { success: boolean };

export const fetchNotes = async (tag?: string) => {
  const { data: res } = await api.get<NoteListResponse>('/notes', {
    params: { tag },
  });
  return res;
};

export const fetchNoteById = async (noteId: string) => {
  const { data: res } = await api.get<Note>(`/notes/${noteId}`);
  return res;
};

export const createNote = async (data: NewNoteData) => {
  const { data: res } = await api.post<Note>('/notes', data);
  return res;
};

export const deleteNote = async (noteId: string) => {
  await api.delete(`/notes/${noteId}`);
};

// export const getTags = async () => {
//   const { data: res } = await nextServer.get<Tag[]>('/tag');
//   return res;
// };

export const register = async (data: RegisterRequest) => {
  const { data: res } = await api.post<User>('/auth/register', data);
  return res;
};

export const login = async (data: LoginRequest) => {
  const { data: res } = await api.post<User>('/auth/login', data);
  return res;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const { data } = await api.get<User>('/auth/session');
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/auth/me');
  return data;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const { data: res } = await api.patch<User>('/auth/me', data);
  return res;
};

export const uploadUserImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post<{ url: string }>('/upload', formData);
  return data.url;
};
