import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/note';

export const checkSession = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const sessionCookie = await nextServer.get<User>('/auth/session', {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return sessionCookie.data;
};

export const detServerUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/auth/me', {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return data;
};

// export const serverLogout = async (): Promise<void> => {
//   const cookieStore = await cookies();
//   await nextServer.post('/auth/logout', null, {
//     headers: {
//       cookie: cookieStore.toString(),
//     },
//   });
// };
