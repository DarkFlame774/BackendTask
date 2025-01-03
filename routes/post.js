import express from "express";
import { createPost, sortfetch } from "../controllers/post.js";
import { authorization } from "../middlewares/auth.js";

const postRouter = express.Router();

postRouter.post("/", authorization, createPost);
postRouter.get("/display",sortfetch);

export default postRouter;