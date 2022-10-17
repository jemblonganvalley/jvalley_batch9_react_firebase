import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getMessaging} from "firebase/messaging"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_firebase_apiKey,
  authDomain: import.meta.env.VITE_firebase_authDomain,
  projectId: import.meta.env.VITE_firebase_projectId,
  storageBucket: import.meta.env.VITE_firebase_storageBucket,
  messagingSenderId: import.meta.env.VITE_firebase_messagingSenderId,
  appId: import.meta.env.VITE_firebase_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const messaging = getMessaging(app)