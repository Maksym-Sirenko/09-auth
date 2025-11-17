// app/(private routes)/notes/action/create/page.tsx

import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';
import type { Metadata } from 'next';
import { VERSEL_URL, IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Create Note — NoteHub',
  description: 'Create a new note in your NoteHub collection.',

  openGraph: {
    title: 'Create Note — NoteHub',
    description: 'Create a new note in your NoteHub collection.',
    url: `${VERSEL_URL}/notes/action/create`,
    siteName: 'NoteHub',
    images: [
      {
        url: IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Create Note',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Create Note — NoteHub',
    description: 'Create a new note in your NoteHub collection.',
    images: IMAGE_URL,
  },
};
const CreateNotePage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNotePage;
