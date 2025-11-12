// lib/store/authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { login, logout, register, getMe } from '../api/clientApi';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userName?: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      fetchUser: async () => {
        try {
          const data = await getMe();
          set({ user: data });
        } catch {
          set({ user: null });
        }
      },
      signIn: async (email, password) => {
        const data = await login({ email, password });
        set({ user: data });
      },
      signUp: async (email, password, userName) => {
        const data = await register({ email, password, userName });
        set({ user: data });
      },
      signOut: async () => {
        await logout();
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
