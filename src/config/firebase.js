// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, signOut, signInWithEmailAndPassword} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDLzKSEXASPa67qnSp8Yey966qr3v3PMSQ',
  authDomain: 'oneriver-test-app.firebaseapp.com',
  projectId: 'oneriver-test-app',
  storageBucket: 'oneriver-test-app.appspot.com',
  messagingSenderId: '992622422230',
  appId: '1:992622422230:web:be17d33972591e6c2b4177',
  measurementId: 'G-Z8KLK112D9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = async () => {
  await signOut(auth);
};
