// app/(private routes)/profile/edit/page.tsx
'use client';

import axios from 'axios';
import { getMe, checkSession } from '@/lib/api/clientApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import css from '@/app/ProfileEdit.module.css';

const EditProfile = () => {
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);

      router.push('/profile');

      try {
        router.refresh();
      } catch {}
      return;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        try {
          const sessionOk = await checkSession();
          if (sessionOk) {
            const fresh = await getMe();
            setUser(fresh);

            const updatedUser2 = await updateMe({ username });
            setUser(updatedUser2);
            router.push('/profile');
            try {
              router.refresh();
            } catch {}
            return;
          } else {
            setError('Session expired, please sign in again.');
            router.push('/sign-in');
            return;
          }
        } catch {
          setError('Failed to update profile. Please try again (or re-login).');
          return;
        }
      }

      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.editProfile}>
      <h1>Edit profile</h1>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form className={css.profileInfo} onSubmit={handleSubmit}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                className={css.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <p>Email: {user.email}</p>
            {error && <p className={css.error}>{error}</p>}

            <div className={css.actions}>
              <button
                type="submit"
                className={css.saveButton}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                className={css.cancelButton}
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        {/* <AvatarPicker /> */}
      </main>
    </div>
  );
};

export default EditProfile;
