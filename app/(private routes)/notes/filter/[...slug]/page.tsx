// app/(private routes)/notes/filter/[...slug]/page.tsx

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import {
  PER_PAGE,
  ALL_NOTES,
  IMAGE_URL,
  VERSEL_URL,
  NoteTag,
} from '@/lib/constants';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const maybe = slug?.[0];

  const tagOrAll =
    !maybe || maybe === 'all' ? 'All' : decodeURIComponent(maybe);
  const title =
    tagOrAll === 'All' ? 'All notes | NoteHub' : `${tagOrAll} notes | NoteHub`;
  const description =
    tagOrAll === 'All'
      ? 'Browse all notes with search and pagination.'
      : `Browse notes tagged "${tagOrAll}".`;
  const url = `${VERSEL_URL}/notes/filter/${
    tagOrAll === 'All' ? 'all' : encodeURIComponent(tagOrAll)
  }`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [
        {
          url: IMAGE_URL,
          width: 1200,
          height: 630,
          alt: tagOrAll === 'All' ? 'All notes' : `${tagOrAll} notes`,
        },
      ],
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: IMAGE_URL,
    },
  };
}

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const slugValue = slug?.[0] ?? ALL_NOTES;

  const queryClient = new QueryClient();

  const tag: NoteTag | undefined =
    slugValue === ALL_NOTES ? undefined : (slugValue as NoteTag);

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: async () => {
      const notes = await fetchNotes({
        search: '',
        tag: tag,
      });

      return {
        items: notes,
        totalPages: 1,
        totalItems: notes.length,
        page: 1,
        perPage: PER_PAGE,
      };
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
