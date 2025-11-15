'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api/clientApi';
import type { NoteListResponse } from '@/types/note';
import css from './Notes.client.module.css';
import Link from 'next/link';
import { PER_PAGE, TAGS, NoteTag } from '@/lib/constants';

interface Props {
  tag?: NoteTag;
}

const NotesClient = ({ tag }: Props) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    debounced(value);
  };

  const { data, isLoading, isError } = useQuery<NoteListResponse, Error>({
    queryKey: ['notes', debouncedSearch, page, currentTag],
    queryFn: async () => {
      const res = await fetchNotes({
        search: debouncedSearch,
        tag: currentTag,
        page,
        perPage: PER_PAGE,
      });

      return {
        notes: res.items,
        totalPages: res.totalPages,
        total: res.totalItems,
        page: res.page,
        perPage: res.perPage,
      } as NoteListResponse;
    },

    placeholderData: {
      notes: [],
      totalPages: 1,
      total: 0,
      page,
      perPage: PER_PAGE,
    },
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError || !data) return <p>Could not fetch the list of notes.</p>;

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

      {data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}
    </section>
  );
};

export default NotesClient;
