// app/@modal/(.)notes/[id]/page.tsx

import { fetchNoteById } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotePreview from './NotePreview.client';

interface NoteProps {
  params: Promise<{ id: string }>;
}

const ModalNotePage = async ({ params }: NoteProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  if (id) {
    await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default ModalNotePage;
