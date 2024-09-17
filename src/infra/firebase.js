import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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
export const db = getFirestore(app);

export const createUserWithRole = async (email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    role: role,
    blocked: false
  });

  await updateProfile(user, {
    displayName: role === 'admin' ? 'Administrador' : 'Colaborador'
  });

  return user;
};

export const getUserRole = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().role;
  } else {
    throw new Error("No user role found!");
  }
};

