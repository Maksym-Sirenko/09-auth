// components/AuthNavigation/AuthNavigation.tsx
'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';

const AuthNavigation = () => {
  const { user, signOut } = useAuthStore();
  const isAuthenticated = !!user;

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/sign-in';
  };

  return (
    <nav className={css.navigation}>
      <ul className={css.navigationList}>
        {isAuthenticated ? (
          <>
            <li className={css.navigationItem}>
              <Link
                href="/profile"
                prefetch={false}
                className={css.navigationLink}
              >
                Profile
              </Link>
            </li>

            <li className={css.navigationItem}>
              <p className={css.userEmail}>{user?.email}</p>
              <button className={css.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={css.navigationItem}>
              <Link
                href="/sign-in"
                prefetch={false}
                className={css.navigationLink}
              >
                Login
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                href="/sign-up"
                prefetch={false}
                className={css.navigationLink}
              >
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default AuthNavigation;
