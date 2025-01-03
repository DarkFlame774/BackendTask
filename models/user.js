import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        require: true
    },

    userEmail:{
        type: String,
        unique: true,
        require: true
    },

    password:{
        type: String,
        require: true
    },

    posts:[{
        type: mongoose.Schema.ObjectId,
        ref: "Post"
    }]

},{timestamp: true});

export const User = mongoose.model("User", userSchema);