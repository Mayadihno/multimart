import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBDMkzrtpx7hvIdsHuzWuzJ1HiW7wo5Mko",
  authDomain: "react-multimart.firebaseapp.com",
  projectId: "react-multimart",
  storageBucket: "react-multimart.appspot.com",
  messagingSenderId: "29523110687",
  appId: "1:29523110687:web:adc519a0d7572cb1f35e2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
