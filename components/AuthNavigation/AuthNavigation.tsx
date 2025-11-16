// components/AuthNavigation/AuthNavigation.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout as apiLogout } from '@/lib/api/clientApi';

const AuthNavigation = () => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logoutLocal = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch {}
    logoutLocal();
    router.push('/sign-in');
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
              <p className={css.userEmail}>
                {user?.username ? user.username : (user?.email ?? '—')}
              </p>
              <button
                className={css.logoutButton}
                onClick={handleLogout}
                type="button"
              >
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
