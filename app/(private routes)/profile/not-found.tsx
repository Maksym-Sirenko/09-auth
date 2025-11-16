// app/(private routes)/profile/not-found.tsx

import Link from 'next/link';
import styles from './notFound.module.css';

export default function ProfileNotFound() {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Profile not found</h1>

      <p className={styles.text}>
        We couldn’t find that profile. Maybe you’re not logged in or the profile
        was removed.
      </p>

      <div className={styles.links}>
        <Link href="/sign-in">Go to sign in</Link>
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
