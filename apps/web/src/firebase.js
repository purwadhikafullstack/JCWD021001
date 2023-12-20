import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAPUZPof7TJGRN9xNvScXEyh5JP0D-xk4I",
    authDomain: "final-project-fffa1.firebaseapp.com",
    projectId: "final-project-fffa1",
    storageBucket: "final-project-fffa1.appspot.com",
    messagingSenderId: "122663545638",
    appId: "1:122663545638:web:6783010a89eed2b900afe7"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
    return 'signin with google success';
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
    signOut(auth);
    return 'logout success';
  };

  export {
    auth,
    db,
    signInWithGoogle,
    logout,
  };