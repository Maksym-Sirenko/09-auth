// app/(private routes)/profile/edit/page.tsx

import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';

const EditProfile = () => {
  return (
    <div>
      <h1>Edit profile</h1>
      <AvatarPicker />
    </div>
  );
};

export default EditProfile;
