import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./db/db.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.js";
dotenv.config();

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);

app.listen(PORT, ()=>{
    console.debug(`Server is listenig at ${PORT}`);
    ConnectDB();
})