import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const firebaseConfig = {
  apiKey: 'AIzaSyAPUZPof7TJGRN9xNvScXEyh5JP0D-xk4I',
  authDomain: 'final-project-fffa1.firebaseapp.com',
  projectId: 'final-project-fffa1',
  storageBucket: 'final-project-fffa1.appspot.com',
  messagingSenderId: '122663545638',
  appId: '1:122663545638:web:6783010a89eed2b900afe7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    // const token = await user.getIdToken()
    // localStorage.setItem('userToken', token)

    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      })
    }

    const axiosRes = await axios.post(`${import.meta.env.VITE_API_URL}auth/google-login`, {
      email: user.email,
      username: user.displayName,
    })
    localStorage.setItem('token', axiosRes?.data?.data?.token)
    return axiosRes

  } catch (err) {
    console.error(err)
    toast.error(err.message)
  }
}

const logout = () => {
  signOut(auth)
  return 'logout success'
}

export { auth, db, signInWithGoogle, logout }
