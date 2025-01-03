import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },

    content:{
        type: String,
    },

    category:{
        type: String,
        enum: ["beauty", "Technology", "Art", "sports"],
        require: true
    },

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    }

},{timestamp: true});

postSchema.index({content: 'text'})

export const Post = mongoose.model("Post",postSchema);