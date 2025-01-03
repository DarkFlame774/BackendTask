import bcryptjs from "bcryptjs";
import { User } from "../models/user.js";

export const registerUser = async (req,res)=>{
    //1. get data from user
    const{username,email,password} = req.body;
    if(!username || !email || !password){
       return res.json("Please provide all details");
    }

    //2. check if user already existed
    const userExist = await User.findOne({userEmail:email});
    if(userExist){
        return res.status(201).json("User already exist")
    }

    //3. hash the password
    const hashedPassword = bcryptjs.hashSync(password,10);
    
    try {
        //4. craete the user
        const user = new User({
            username: username,
            userEmail: email,
            password: hashedPassword
        })
        await user.save();
    
        //5. generate response
        res.status(201).json("User craeted successfully");
    } catch (error) {
        res.status(500).json("An error occured check the console");
        console.debug(error);
    }
}