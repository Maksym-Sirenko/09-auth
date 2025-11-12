import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNoteData } from '../api/clientApi';

interface NoteDraftStore {
  draft: NewNoteData;
  setDraft: (draft: NewNoteData) => void;
  clearDraft: () => void;
}

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tagID: '',
};

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
