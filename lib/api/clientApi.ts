// lib/api/clientAuth.ts
import { nextServer } from './api';
import { NoteListResponse, Note } from '@/types/note';
import { User } from '@/types/note';

export type RegisterRequest = {
  email: string;
  password: string;
  userName?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type Tag = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewNoteData = {
  title: string;
  content: string;
  tagID: string;
};

export type UpdateUserRequest = {
  userName?: string;
  imageUrl?: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export const getNotes = async (tagID?: string) => {
  const { data: res } = await nextServer.get<NoteListResponse>('/notes', {
    params: { tagID },
  });
  return res;
};

export const getSingleNote = async (noteId: string) => {
  const { data: res } = await nextServer.get<Note>(`/notes/${noteId}`);
  return res;
};

export const createNote = async (data: NewNoteData) => {
  const { data: res } = await nextServer.post<Note>('/notes', data);
  return res;
};

export const getTags = async () => {
  const { data: res } = await nextServer.get<Tag[]>('/tag');
  return res;
};

export const register = async (data: RegisterRequest) => {
  const { data: res } = await nextServer.post<User>('/auth/register', data);
  return res;
};

export const login = async (data: LoginRequest) => {
  const { data: res } = await nextServer.post<User>('/auth/login', data);
  return res;
};

export const logout = async () => {
  await nextServer.post<User>('/auth/logout');
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const getUser = async () => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};

export const updateUser = async (data: UpdateUserRequest) => {
  const { data: res } = await nextServer.put<User>('/auth/me', data);
  return res;
};

export const uploadUserImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await nextServer.post<{ url: string }>('/upload', formData);
  return data.url;
};
