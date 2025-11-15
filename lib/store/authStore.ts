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
      signIn: async (email: string, password: string) => {
        try {
          const data = await login({ email, password });
          set({ user: data });
        } catch {
          throw new Error('Login failed');
        }
      },
      signUp: async (email: string, password: string, userName?: string) => {
        try {
          const data = await register({ email, password, userName });
          set({ user: data });
        } catch {
          throw new Error('Registration failed');
        }
      },
      signOut: async () => {
        try {
          await logout();
          set({ user: null });
        } catch {
          throw new Error('Logout failed');
        }
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
