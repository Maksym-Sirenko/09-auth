// app/(private routes)/profile/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getMe } from '@/lib/api/clientApi';
import css from './profile.module.css';

const ProfilePage = async () => {
  let user;
  try {
    user = await getMe();
  } catch {
    user = null;
  }

  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <p>User not found or not logged in.</p>
          <Link href="/sign-in">Go to Sign In</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
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
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.userName}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
