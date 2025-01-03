import express from "express";
import { registerUser } from "../controllers/user.js";
import { loginUser } from "../controllers/auth.js";

const userRouter = express.Router();

userRouter.route("/").post(registerUser);
userRouter.route('/login').post(loginUser);

export default userRouter;