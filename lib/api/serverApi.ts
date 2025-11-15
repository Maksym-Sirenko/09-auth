// lib/api/serverApi.ts
import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';
import { Note, NoteListResponse } from '@/types/note';

export type NotesQuery = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
};

export const fetchNotes = async (
  params?: NotesQuery,
): Promise<NoteListResponse> => {
  const cookieStore = await cookies();
  const { data } = await api.get<NoteListResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      ...params,
      perPage: params?.perPage || 12,
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<User>('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch {
    return null;
  }
};

// export const serverLogout = async (): Promise<void> => {
//   const cookieStore = await cookies();
//   await nextServer.post('/auth/logout', null, {
//     headers: {
//       cookie: cookieStore.toString(),
//     },
//   });
// };
