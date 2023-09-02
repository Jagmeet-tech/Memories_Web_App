import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

//All mongoose methods are asynchronous.
//PostMessage = table (db.table) or collection

export const getPosts = async (req , res) => {
    const {page} = req.query;
   try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1 ) * LIMIT;     //get the starting index of every page 
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id:-1 }).limit(LIMIT).skip(startIndex);     //fn takes time
        res.status(200).json({data : posts,currentPage : Number(page),numberOfPages : Math.ceil(total / LIMIT)});
   } catch (error) {
        res.status(404).json({
            "message" : error.message,
        })
   }
}

export const getPost = async(req,res) =>{
    const {id} = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);    
    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

//Query -> "/posts?page=1"                =>variable page = 1
//Params-> "/posts/:id"    -> /posts/123  => id = 1

export const getPostsBySearch = async (req,res) => {
    const {searchQuery,tags} = req.query; 
    try {
        const title = new RegExp(searchQuery,"i");  //i:- ignore case ex:- TEST,test,Test..
        const posts = await PostMessage.find({$or : [{title} , {tags : {$in: tags.split(",")}}]});
        
        res.json({data : posts});
    } catch (error) {
        console.log(error);
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