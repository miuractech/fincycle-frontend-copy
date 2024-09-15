// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjZiaO3ThLWYhPyBVFJSVpTC_hR6Ld1vs",
  authDomain: "dcycle-test-a894a.firebaseapp.com",
  databaseURL: "https://dcycle-test-a894a-default-rtdb.firebaseio.com",
  projectId: "dcycle-test-a894a",
  storageBucket: "dcycle-test-a894a.appspot.com",
  messagingSenderId: "918033223089",
  appId: "1:918033223089:web:2b391a337b22937d1f0190",
  measurementId: "G-139HH0HFX2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app, 'asia-south1');
export const analytics = getAnalytics(app);

// connectFunctionsEmulator(functions, 'localhost', 5001);
// connectFirestoreEmulator (db, 'localhost', 8080);
// connectStorageEmulator (storage, 'localhost', 9199);

export { functions, db, storage };
