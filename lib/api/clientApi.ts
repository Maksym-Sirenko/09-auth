// lib/api/clientApi.ts
import { AxiosResponse } from 'axios';
import { api } from './api';
import { Note, NoteTag } from '@/types/note';
import { User } from '@/types/user';
import { normalizeUserResponse } from '../utils/normalizeUser';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface PagedNotes {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Note[];
}

type RawFetchNotesResponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  notes?: Note[];
  results?: Note[];
  items?: Note[];
  data?: Note[];
};

export type CreateNoteInput = Pick<Note, 'title' | 'content' | 'tag'>;

export async function fetchNotes(
  params: FetchNotesParams = {},
): Promise<PagedNotes> {
  const { page = 1, perPage = 12, search, tag } = params;

  const q = (search ?? '').trim();
  const queryParams: Record<string, unknown> = { page, perPage };

  if (q.length >= 2) queryParams.search = q;
  if (tag) queryParams.tag = tag;

  const res: AxiosResponse<RawFetchNotesResponse> = await api.get('/notes', {
    params: queryParams,
  });

  const data = res.data;
  const items =
    data.notes ?? data.results ?? data.items ?? data.data ?? ([] as Note[]);

  return {
    page: data.page ?? page,
    perPage: data.perPage ?? perPage,
    totalItems: data.totalItems ?? items.length,
    totalPages:
      data.totalPages ??
      Math.max(
        1,
        Math.ceil(
          (data.totalItems ?? items.length) / (data.perPage ?? perPage),
        ),
      ),
    items,
  };
}

export async function fetchNoteById(id: string | number): Promise<Note> {
  const res: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return res.data;
}

export async function createNote(input: CreateNoteInput): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post('/notes', input);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username?: string;
  avatar?: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>('/auth/register', data);
  return normalizeUserResponse(res.data);
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return normalizeUserResponse(res.data);
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const res = await api.get('/users/me');
  return normalizeUserResponse(res.data);
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.patch('/users/me', payload);
  return normalizeUserResponse(res.data);
};
