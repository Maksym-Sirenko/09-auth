// app/(private routes)/profile/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';
import css from './profile.module.css';
import { Metadata } from 'next';
import { VERSEL_URL, IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Profile — NoteHub',
  description: 'User profile: Manage your NoteHub account.',

  openGraph: {
    title: 'Profile — NoteHub',
    description: 'User profile: Manage your NoteHub account.',
    url: `${VERSEL_URL}/profile`,
    siteName: 'NoteHub',
    images: [
      {
        url: IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Profile',
      },
    ],
    type: 'profile',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Profile — NoteHub',
    description: 'User profile: Manage your NoteHub account.',
    images: IMAGE_URL,
  },
};

async function ProfilePage() {
  const user = await getMe();

  return (
    <section className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt={user.username || 'User Avatar'}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <dl className={css.info}>
          <div className={css.row}>
            <dt>Username</dt>
            <dd>{user.username || '—'}</dd>
          </div>
          <div className={css.row}>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default ProfilePage;
