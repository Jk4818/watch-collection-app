import React, {useState} from 'react';
import { motion } from "framer-motion";

import { Link, useNavigate } from 'react-router-dom';

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
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
import { auth, db } from "../firebase";

function SignUp(props) {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  }

  //GOOGLE AUTH
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  //PASSWORD RESET
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  //SIGNUP

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const signUpNavigate = useNavigate();
  const registerWithEmailAndPassword = (e) => {
    e.preventDefault();
    console.log(signUpEmail,signUpPassword);

    auth.createUserWithEmailAndPassword(signUpEmail, signUpPassword).then(cred => {
      console.log(cred);
      signUpNavigate('/collection');
    });
  };



  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className='bg-main w-screen h-screen overflow-hidden'>
      <div className="w-full h-full flex items-center justify-center">
        <div className='w-96 h-96 text-center flex flex-col gap-4'>
          <button onClick={signInWithGoogle} className='w-full h-12 border-2 border-black rounded-md p-2 bg-main flex justify-center items-center gap-3 font-bold transition-all hover:-translate-y-1'>
            <svg className="svg" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fillRule="evenodd" fillOpacity="1" fill="#4285f4" stroke="none"></path><path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fillRule="evenodd" fillOpacity="1" fill="#34a853" stroke="none"></path><path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fillRule="evenodd" fillOpacity="1" fill="#fbbc05" stroke="none"></path><path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fillRule="evenodd" fillOpacity="1" fill="#ea4335" stroke="none">
              </path>
            </svg>
            Continue with Google
            </button>

          <p className='font-Actor tracking-wide font-semibold'>or</p>

          <form onSubmit={registerWithEmailAndPassword} className='flex flex-col gap-4 font-Actor text-center' >
            <input onChange={(e) => setSignUpEmail(e.target.value)} className='h-12 border-2 border-black rounded-md p-2 bg-main focus:bg-white focus:outline-none focus:border-blue-500 ' name="email" type="email" placeholder="Email" required/>

            <input onChange={(e) => setSignUpPassword(e.target.value)} className='h-12 border-2 border-black rounded-md p-2 bg-main focus:bg-white focus:outline-none focus:border-blue-500 ' name="password" type="password" placeholder="Password" required/>
            <button className='h-12 border-2 border-black rounded-md bg-black text-main font-bold tracking-wide' type="submit">Create account</button>

            <div>Already have an account? <span className='text-blue-600 hover:underline hover:underline-offset-1 hover:font-semibold'><Link to="/login">Log in</Link></span></div>
          </form>

        </div>
      </div>
    </motion.div>
  );
}

export default SignUp;