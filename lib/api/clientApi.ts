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

// type CheckSessionRequest = { success: boolean };

export const fetchNotes = async (
  search?: string,
  page?: number,
  tag?: string,
) => {
  const { data: res } = await api.get<NoteListResponse>('/notes', {
    params: { search, page, perPage: 12, tag },
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

// export const register = async (data: RegisterRequest) => {
//   const { data: res } = await api.post<User>('/auth/register', data);
//   return res;
// };

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);

  // Після успішної реєстрації, спробуйте отримати користувача
  try {
    const userData = await getMe();
    return userData;
  } catch (error) {
    console.error('Failed to get user after registration:', error);
    return response.data;
  }
};

// export const login = async (data: LoginRequest) => {
//   const { data: res } = await api.post<User>('/auth/login', data);
//   return res;
// };

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await api.post<User>('/auth/login', data);

  // Після входу отримайте дані користувача
  try {
    const userData = await getMe();
    return userData;
  } catch (error) {
    console.error('Failed to get user after login:', error);
    return response.data;
  }
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const response = await api.get<User>('/auth/session');
  return response.data;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const { data: res } = await api.patch<User>('/users/me', data);
  return res;
};

export const uploadUserImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post<{ url: string }>('/upload', formData);
  return data.url;
};
