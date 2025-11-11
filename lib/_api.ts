import axios from 'axios';
import { Note, NewNote, NoteTag } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  searchText: string;
  page: number;
  tag: '' | NoteTag;
}

// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export const fetchNotes = async ({
//   search = '',
//   page = 1,
//   tag = '',
//   perPage = PER_PAGE,
// }: {
//   search?: string;
//   page?: number;
//   perPage?: number;
//   tag?: string;
// } = {}): Promise<FetchNotesResponse> => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   const params: Record<string, string | number> = {
//     search,
//     page,
//     perPage,
//   };

//   if (tag) {
//     params.tag = tag;
//   }

//   const { data } = await NoteService.get<FetchNotesResponse>('', {
//     params,
//   });
//   return data;
// };

// export const fetchNoteById = async (noteId: string): Promise<Note> => {
//   const { data } = await NoteService.get<Note>(`/${noteId}`, {
//     params: { noteId },
//   });
//   return data;
// };

// export const createNote = async (newNote: {
//   title: string;
//   content: string;
//   tag: string;
// }) => {
//   const { data } = await NoteService.post<Note>('', newNote);
//   return data as Note;
// };

// export const deleteNote = async (noteId: string) => {
//   const { data } = await NoteService.delete<Note>(`/${noteId}`);
//   return data as Note;
// };
