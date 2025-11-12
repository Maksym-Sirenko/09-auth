// app/(private routes)/profile/edit/page.tsx
'use client';

import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import css from 'profileEdit.module.css';

const EditProfile = () => {
  return (
    <div className={css.editProfile}>
      <h1>Edit profile</h1>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <img
            src="avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form className={css.profileInfo}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input id="username" type="text" className={css.input} />
            </div>

            <p>Email: user_email@example.com</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button type="button" className={css.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <AvatarPicker />
    </div>
  );
};

export default EditProfile;
