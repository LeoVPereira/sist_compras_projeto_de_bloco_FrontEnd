
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBtbAom7OzkXPJQ6YB6jmC-nFa5fBv8Knc",
  authDomain: "sistema-de-compras-front.firebaseapp.com",
  projectId: "sistema-de-compras-front",
  storageBucket: "sistema-de-compras-front.appspot.com",
  messagingSenderId: "381574061009",
  appId: "1:381574061009:web:c009a0662bab9ba8399ef0"
};

 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);