// app/(public routes)/sign-up/page.tsx

'use client';

import axios from "axios";
import { Note } from "@/types/note";
import { TAGS } from "@/lib/constants";
import {NewNote} from "@/types/note";

interface AuthUserData {
  email: string;
  password: string;
}

const initialUserData: AuthUserData = {
  email: '',
  password: '',
};

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (
    values: AuthUserData,
    actions.ResetForm();
  ) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as RegisterRequest; // Виконуємо запит
      const res = await register(formValues); // Виконуємо редірект або відображаємо помилку
      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error',
      );
    }
  };

  return (
    <>
            <h1>Sign up</h1>     {' '}
      <form action={handleSubmit}>
               {' '}
        <label>
                    Username          {' '}
          <input type="text" name="userName" required />       {' '}
        </label>
               {' '}
        <label>
                    Email           <input type="email" name="email" required />
                 {' '}
        </label>
               {' '}
        <label>
                    Password          {' '}
          <input type="password" name="password" required />       {' '}
        </label>
                <button type="submit">Register</button>     {' '}
      </form>
            {error && <p>{error}</p>}   {' '}
    </>
  );
};

export default SignUp;
