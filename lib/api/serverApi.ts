// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export const fetchNotes = async (): Promise<Note[] | null> => {
  const cookieStore = await cookies();
  const { data } = await api.get<Note[]>('/notes', {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getMe = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>('/auth/me', {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const { data } = await api.get<{ success: boolean }>('/auth/session', {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return data.success;
};

// export const serverLogout = async (): Promise<void> => {
//   const cookieStore = await cookies();
//   await nextServer.post('/auth/logout', null, {
//     headers: {
//       cookie: cookieStore.toString(),
//     },
//   });
// };
