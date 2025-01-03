import mongoose from "mongoose";

 
export const ConnectDB = async ()=>{
    try {
        const instance = await mongoose.connect(process.env.MONGO_URI);
        console.debug(`Connection is established with ${instance.connection.host}`)
    } catch (error) {
        console.debug(error);
    }
}