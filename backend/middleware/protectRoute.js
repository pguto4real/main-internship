import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../db/firebase/connectFirebase.js";
export const protectRoute = async (req, res, next) => {
  try {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // console.log('i got here2')
        req.user = user;
        next();
        //   return res.status(201).json({ data: user, isLoggedIn: true });
      } else {
        return res.status(404).json({ error: "No User Logged In" });
      }
    });
  } catch (error) {
    console.log("Error in protected route middleware", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error in protected route middleware" });
  }
};
