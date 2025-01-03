import { Post } from "../models/post.js";
import { User } from "../models/user.js";

export const createPost = async (req,res)=>{
try {
        //1. take data from user
        const {title, content, category} = req.body;
        if(!title || !category){
            return res.status(401).json("provide all details");
        }
    
        //2. get the loggined useIdr
        const userId = req.user;
        const user = await User.findOne({_id:userId});
   
    
        //3. craete post
        const post = await new Post({
            title: title,
            content: content,
            category: category,
            user: userId
        })
        await post.save();
        user.posts.push(post._id);
        await user.save();
    
        //4. generate response
        res.status(200).json("Post created successfully");
} catch (error) {
    res.status(500).json("Something went wrong check the console")
    console.debug(error);
}
}

export const sortfetch = async(req,res)=>{
    //1. get keyword for sorting from user
   //const kewword = req.body;
    
    const query = {
        $or: [
        {content:  {$not: /.*\bai\b.*/}},  
        {content:  {$not: /^ai$/ }},
        {content:  {$not: /ai$/}},
    ]}
    const query1 = {
        $or: [
        {content:  /.*\bai\b.*/},  
        {content:  /^ai$/ },
        {content:  /ai$/ },
    ]
};
    const projection ={
        _id: 0,
        title: 1
    }
    const result1 = await Post.find(query1).exec()
    const result2 = await Post.find(query).exec()
    const result = result1.concat(result2);
    res.json(result);
}