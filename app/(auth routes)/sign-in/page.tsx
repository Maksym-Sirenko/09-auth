'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as Yup from 'yup';
import css from './SignUp.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { register } from '@/lib/api/clientApi';

const signInSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      await signInSchema.validate(formData, { abortEarly: false });

      const user = await register({
        email: formData.email,
        password: formData.password,
      });

      setUser(user);

      router.push('/profile');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors: { email?: string; password?: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path as keyof typeof errors] = error.message;
          }
        });
        setFieldErrors(errors);
      } else if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Something went wrong during registration.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`${css.input} ${fieldErrors.email ? css.inputError : ''}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {fieldErrors.email && (
            <span className={css.fieldError}>{fieldErrors.email}</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={`${css.input} ${fieldErrors.password ? css.inputError : ''}`}
            value={formData.password}
            onChange={handleChange}
            required
          />
          {fieldErrors.password && (
            <span className={css.fieldError}>{fieldErrors.password}</span>
          )}
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in…' : 'Log in'}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}

        <p className={css.helper}>
          Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
        </p>
      </form>
    </main>
  );
};

export default SignIn;
