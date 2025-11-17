// app/@modal/(.)notes/[id]/page.tsx

import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotePreviewClient from './NoteDetails.client';
import { IMAGE_URL, VERSEL_URL } from '@/lib/constants';

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Note Details — NoteHub',
  description: 'View note details in NoteHub application.',

  openGraph: {
    title: 'Note Details — NoteHub',
    description: 'View note details in NoteHub application.',
    url: `${VERSEL_URL}/notes`,
    siteName: 'NoteHub',
    images: [
      {
        url: IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Note Details',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Note Details — NoteHub',
    description: 'View note details in NoteHub application.',
    images: IMAGE_URL,
  },
};

const NotePreviewPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
};

export default NotePreviewPage;
