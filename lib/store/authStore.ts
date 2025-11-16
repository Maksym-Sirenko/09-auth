import { create } from 'zustand';
import type { User } from '@/types/user';
import {
  getMe,
  checkSession,
  login,
  register as apiRegister,
  logout as apiLogout,
} from '@/lib/api/clientApi';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
  checkAuth: () => Promise<void>;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
  checkAuth: async () => {
    try {
      const ok = await checkSession();
      if (ok) {
        const u = await getMe();
        set({ user: u, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },
  logout: async () => {
    set({ user: null, isAuthenticated: false });
    try {
      await apiLogout();
      localStorage.removeItem('accessToken');
    } catch {}
  },
  signIn: async (email, password) => {
    const user = await login({ email, password });
    set({ user, isAuthenticated: true });
  },
  signUp: async (email, password) => {
    const user = await apiRegister({ email, password });
    set({ user, isAuthenticated: true });
  },
}));
