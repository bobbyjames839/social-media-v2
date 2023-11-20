import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBcn7DDfhBVH5mz73r54uS-Q-LHiin8QLM",
  authDomain: "svellco.firebaseapp.com",
  projectId: "svellco",
  storageBucket: "svellco.appspot.com",
  messagingSenderId: "416175524307",
  appId: "1:416175524307:web:a7981e3cab809d26b88726"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);