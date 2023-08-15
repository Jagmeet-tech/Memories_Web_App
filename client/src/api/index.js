import axios from "axios";

const url = "http://localhost:5000/posts";

//starting api req. methods contaiing same urls defined in a file.

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url,newPost);
export const updatePost = (id,updatePost) => axios.patch(`${url}/${id}`,updatePost);
export const deletePost = (id) => axios.delete(`${url}/${id}`,id);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`,id);