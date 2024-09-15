import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "../db/firebase/connectFirebase.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      return res.status(201).json({ data: user });
      // ...
    })
    .catch((error) => {
      console.log("Error in signup controller", error.message);
      return res.status(500).json({ error: error.message });
      // ..
    });
};
export const login = async (req, res) => {
 
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      return res.status(201).json({ data: user });

    })
    .catch((error) => {
      console.log("Error in login controller", error.message);
      return res.status(500).json({ error: error.message });
      // ..
    });
};
export const logout = async (req, res) => {
  try {
    signOut(firebaseAuth);
    return res.status(201).json({ message: "Logged out succesfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error in logout controller" });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    onAuthStateChanged(firebaseAuth, (user) => {
      return res.status(201).json({ data: user, isLoggedIn: true });
    });
  } catch (error) {
    console.log("Error in getCurrentUser controller", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error in getCurrentUser controller" });
  }
};
