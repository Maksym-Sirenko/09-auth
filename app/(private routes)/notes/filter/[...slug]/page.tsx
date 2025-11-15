import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import {
  PER_PAGE,
  ALL_NOTES,
  IMAGE_URL,
  VERSEL_URL,
  NoteTag,
} from '@/lib/constants';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';
import type { NoteListResponse } from '@/types/note';

interface Props {
  params: { slug: string[] };
}

export async function generateMetadata({
  params,
}: {
  params: Props['params'];
}): Promise<Metadata> {
  const slug = params.slug?.[0] ?? 'all';

  return {
    title: `Notes - ${slug}`,
    description: `Notes filtered by ${slug}`,
    openGraph: {
      title: `Notes - ${slug}`,
      description: `Notes filtered by ${slug}`,
      url: `${VERSEL_URL}/notes/filter/${slug}`,
      images: [{ url: IMAGE_URL, width: 1200, height: 630, alt: 'Notes' }],
    },
  };
}

const NotesPage = async ({ params }: Props) => {
  const slug = params.slug?.[0] ?? ALL_NOTES;
  const queryClient = new QueryClient();

  const tag: NoteTag | undefined =
    slug === ALL_NOTES ? undefined : (slug as NoteTag);

  await queryClient.prefetchQuery<NoteListResponse>({
    queryKey: ['notes', '', 1, tag],
    queryFn: async () => {
      const res = await fetchNotes({
        search: '',
        tag: tag,
        page: 1,
        perPage: PER_PAGE,
      });

      return {
        notes: res.items,
        totalPages: res.totalPages,
        page: res.page,
        perPage: PER_PAGE,
      } as NoteListResponse;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
