import { auth } from '@xcycle-tools/config';
import { sendNotification } from '@xcycle-tools/components';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { authType } from './index.ui';
export const emailAuth = async (mode: 'login' | 'register', data: authType) => {
  try {
    if (mode === 'login') {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } else {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    }
  } catch (error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        sendNotification({
          status: 'failed',
          title: 'Try Log In!',
          message: 'Email Already in use',
        });
        break;
      case 'auth/user-not-found':
        sendNotification({
          status: 'failed',
          title: 'Try Sign Up!',
          message: 'Email not registered!',
        });
        break;
      case 'auth/invalid-credential':
        sendNotification({
          status: 'failed',
          title: 'Invalid credentials!',
          message: 'Check your password',
        });
        break;
      default:
        sendNotification({
          status: 'failed',
          title: 'Not Authorized!',
        });
    }
  }
};
