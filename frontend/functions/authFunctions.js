
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../firebase/connectFirebase";
const googleProvider = new GoogleAuthProvider();

export const signUp = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
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
