import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
// import { currentUser, login, logout, signup } from "../controllers/auth.controller.js"
// import { protectRoute } from "../middleware/protectRoute.js"

console.log("jdjdjd");
const router = express.Router();

// router.get('/signup', (req, res) => {
//     res.json({
//         data: "you hit signup"
//     })
//     // res.send("Server is ready")
// })
router.get("/currentUser", protectRoute, getCurrentUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
