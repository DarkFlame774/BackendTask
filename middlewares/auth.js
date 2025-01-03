import jwt from "jsonwebtoken";

export const authorization = (req,res,next)=>{
    const token = req.cookies.access_token;

    if(!token){
        return res.status(403);
    }
    try {
        const data = jwt.verify(token,process.env.SECRET_KEY);
        req.user = data.id;
        return next();
    } catch (error) {
        console.debug(error);
    }
}