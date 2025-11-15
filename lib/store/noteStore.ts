// app/lib/store/noteStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CreateNoteInput } from '@/lib/api/clientApi';

const initialDraft: CreateNoteInput = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteDraftStore {
  draft: CreateNoteInput;
  setDraft: (note: CreateNoteInput) => void;
  clearDraft: () => void;
}

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
