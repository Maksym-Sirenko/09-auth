// app/(public)/sign-in/page.tsx
import SignInForm from '@/components/Auth/SignInForm.client';
import css from './SignIn.module.css';

export default function SignInPage() {
  return (
    <main className={css.main}>
      <h1 className={css.title}>Sign in</h1>
      <SignInForm />
    </main>
  );
}
