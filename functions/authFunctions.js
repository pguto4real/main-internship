
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db, firebaseAuth } from "../firebase/connectFirebase";
import { doc, setDoc } from "firebase/firestore";
const googleProvider = new GoogleAuthProvider();

export const signUp = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    if(userCredential){
      
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
   
        createdAt: new Date().toISOString(),
      });
        
    }
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    if(userCredential){
      
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
   
        createdAt: new Date().toISOString(),
      });
        
    }
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const guestLogin = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      'a@a.com',
      'dallastx1'
    );
    if(userCredential){
      
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
   
        createdAt: new Date().toISOString(),
      });
        
    }
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      // The signed-in user info
      const user = result.user;

      if(user){
      
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
     
          createdAt: new Date().toISOString(),
        });
          
      }
      return user;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      throw new Error(error.message);
    }
  };

  export const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (error) {
      throw new Error(error.message);
    }
  };
