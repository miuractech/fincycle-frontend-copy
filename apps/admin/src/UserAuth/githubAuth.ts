import { auth } from '@xcycle-tools/config';
import {
  sendNotification,
} from '@xcycle-tools/components';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GithubAuthProvider();
export const githubAuth = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.log(error);
    if (error.code === 'auth/account-exists-with-different-credential') {
      sendNotification({
        status: 'failed',
        message: 'email already registered in other methods',
      });
    }
    sendNotification({
      status: 'failed',
      title: 'Not Authorised!',
    });
  }
};
