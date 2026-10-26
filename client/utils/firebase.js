
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview-iq-3ab93.firebaseapp.com",
  projectId: "interview-iq-3ab93",
  storageBucket: "interview-iq-3ab93.firebasestorage.app",
  messagingSenderId: "1072182904062",
  appId: "1:1072182904062:web:4974c49c0ff218219dd1af"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}