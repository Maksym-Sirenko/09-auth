// app/(private routes)/profile/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';
import css from './Profile.module.css';

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
