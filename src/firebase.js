import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOFssf7oMMTedHo2FucBsuhRY_ykecjlI",
  authDomain: "pomodro-ad582.firebaseapp.com",
  projectId: "pomodro-ad582",
  storageBucket: "pomodro-ad582.appspot.com",
  messagingSenderId: "947779906351",
  appId: "1:947779906351:web:422592b77f7352e47c0fda",
  measurementId: "G-S7GMGP97E9",
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const db = getFirestore(app);

// *********************** SignInWithGoogle *****************************
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const que = query(collection(db, "users"), where("uid", "==", user.uid));
    const queryDocs = await getDocs(que);
    if (queryDocs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// *********************** signInWithEmailAndPwd *****************************
export const signInWithEmailAndPwd = async (email, pwd) => {
  try {
    await signInWithEmailAndPassword(auth, email, pwd);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

// *********************** registerWithEmailAndPwd *****************************
export const registerWithEmailAndPwd = async (name, email, pwd) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, pwd);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// *********************************** Logout *********************************
export const logout = () => {
    signOut(auth);
};

