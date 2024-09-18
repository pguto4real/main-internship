
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase/connectFirebase";


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
