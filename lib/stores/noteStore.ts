// app/lib/store/noteStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNoteData } from '../api/clientApi';

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tagID: '',
};

interface NoteDraftStore {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
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
