// lib/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { login, logout, register, getMe, checkSession } from '../api/clientApi';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userName?: string) => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      fetchUser: async () => {
        try {
          const user = await getMe();
          set({ user, isAuthenticated: true });
        } catch {
          set({ user: null, isAuthenticated: false });
        }
      },

      signIn: async (email: string, password: string) => {
        const user = await login({ email, password });
        set({ user, isAuthenticated: true });
      },

      signUp: async (email: string, password: string, userName?: string) => {
        const user = await register({ email, password, userName });
        set({ user, isAuthenticated: true });
      },

      signOut: async () => {
        await logout();
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        try {
          const user = await checkSession();
          if (user) {
            set({ user, isAuthenticated: true });
            return true;
          } else {
            set({ user: null, isAuthenticated: false });
            return false;
          }
        } catch {
          set({ user: null, isAuthenticated: false });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
