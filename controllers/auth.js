import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const loginUser = async (req,res)=>{
try {
        //1. take credentails from user
        const{email,password} = req.body;
        if(!email || !password){
            return res.json("Please fill the fields");
         }
        //2. check if the user exist
        const existUser = await User.findOne({userEmail:email});
            if(!existUser){
                return res.status(404).json("User not found");   
            }
    
        //3. verify the credentails
        if(!bcryptjs.compare(password,existUser.password)){
            return res.status(401).json("Invalid Credentails");
        }
    
        //4. Craete a payLoad
        const userPayLoad = {
            id: existUser.id,
            username: existUser.username,
            email: existUser.userEmail
        }
        
        //5. generate the token
        const token = jwt.sign(userPayLoad, process.env.SECRET_KEY);
    
        //6. store the cookie
        res.cookie("access_token",token,{
            httpOnly: true,
            secure: true
        })
    
        //7. generate the response
        res.status(200).json("Login Successful");
} catch (error) {
    res.status(500).json("An error occured check the console");
    console.debug(error);
}
}