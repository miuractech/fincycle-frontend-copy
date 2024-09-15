import { auth } from '@xcycle-tools/config';
import {
  sendNotification,
} from '@xcycle-tools/components';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();
export const googleAuth = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    sendNotification({ title: 'Not Authorised!', status: 'failed' });
  }
};
