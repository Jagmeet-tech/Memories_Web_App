import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

//All mongoose methods are asynchronous.

export const getPosts = async (req , res) => {
   try {
        const postMessages = await PostMessage.find();     //fn takes time
        res.status(200).json(postMessages);
   } catch (error) {
        res.status(404).json({
            "message" : error.message,
        })
   }
}

export const createPost = async (req,res) => { 
    const post  = req.body;
    
    const newPost = new PostMessage({...post,creator : req.userId,createdAt : new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

export const updatePost = async (req,res) => {
    const {id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).send("No post with this id to update.");

    const updatedPost = {...post , _id: id };    

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).send("No post with this id to delete.");

    await PostMessage.findByIdAndRemove(id);
    res.json({
        message : "Post deleted successfully",
    });
}

export const likePost = async (req,res) => {
    const {id} = req.params;
    if(!req.userId) //middleware
        res.status(400).json({message : "Unauthenticated."});
    
    if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).send("No post with this id to like.");
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((userid) => userid === String(req.userId));

    if(index == -1){
        post.likes.push(req.userId);    //new user has liked the post.
    }else{
        post.likes = post.likes.filter((userid) => userid !== String(req.userId)); //already user liked the post so dislike or remove its like by removing user from that likes array.
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});

    res.json(updatedPost);
    
} 