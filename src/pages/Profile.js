import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const Profile = () => {

  const [user] = useAuthState(auth);
  const postsRef = collection(db, 'posts');

  const schema = yup.object().shape({
    description: yup.string().required('You must add a description.'),
  });

  const {register, handleSubmit, formState: {errors},} = useForm({
    resolver: yupResolver(schema),
  })

  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
      profilePic: user?.photoURL,
    });
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <textarea placeholder="Description..." {...register('description')} />
      <p style={{'color': 'red'}}>{errors.description?.message}</p>
      <input type="submit" />
    </form>
  );
};
