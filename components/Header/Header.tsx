// components/Header/Header.tsx

import css from './Header.module.css';
import Link from 'next/link';
import { ALL_NOTES } from '@/lib/constants';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} aria-label="Home">
        NoteHub
      </Link>

      <div className={css.navWrapper}>
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href={`/notes/filter/${ALL_NOTES}`}>Notes</Link>
          </li>
        </ul>

        <AuthNavigation />
      </div>
    </header>
  );
};

export default Header;
