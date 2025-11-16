'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { useAuthStore } from '@/lib/store/authStore';

import { fetchNotes } from '@/lib/api/clientApi';
import type { Note, NoteTag } from '@/types/note';
import { PER_PAGE } from '@/lib/constants';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import css from './NotesClient.module.css';

interface Props {
  tag?: NoteTag;
}

interface NotesResponse {
  items: Note[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

export default function NotesClient({ tag }: Props) {
  const { isAuthenticated } = useAuthStore();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentTag, setCurrentTag] = useState<NoteTag | undefined>(tag);

  useEffect(() => {
    setCurrentTag(tag);
    setPage(1);
    setSearch('');
    setDebouncedSearch('');
  }, [tag]);

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debounced(value);
  };

  const {
    data = { items: [], totalPages: 1, totalItems: 0, page, perPage: PER_PAGE },
    isLoading,
    isError,
  } = useQuery<NotesResponse, Error>({
    queryKey: ['notes', page, debouncedSearch, currentTag],
    queryFn: async () => {
      const res = await fetchNotes({
        search: debouncedSearch,
        page,
        perPage: PER_PAGE,
        tag: currentTag,
      });

      return {
        items: res.items || [],
        totalPages: res.totalPages ?? 1,
        totalItems: res.totalItems ?? 0,
        page: res.page ?? page,
        perPage: res.perPage ?? PER_PAGE,
      };
    },
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) return <p>Please log in to see notes.</p>;
  if (isError) return <p>Could not fetch notes.</p>;

  const hasNotes = Array.isArray(data.items) && data.items.length > 0;

  const notesToRender = isLoading
    ? Array.from(
        { length: PER_PAGE },
        (_, i) => ({ id: `placeholder-${i}`, title: '', content: '' }) as Note,
      )
    : data.items;

  return (
    <section className={css.section}>
      <div className={css.header}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <Link href="/notes/action/create" className={css.createButton}>
          Create Note
        </Link>
      </div>

      {data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          setCurrentPage={setPage}
        />
      )}

      <NoteList notes={notesToRender} isLoading={isLoading} />

      {!hasNotes && !isLoading && <p>No notes found</p>}
    </section>
  );
}
