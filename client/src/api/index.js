import axios from "axios";
const API = axios.create({baseURL : "http://localhost:5000"});  //why ? so that we do't need to write axios and base url again and again.

//starting api req. methods contaiing same urls defined in a file.

API.interceptors.request.use((req)=>{   //used to manipulate request object config.
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).jwtGToken}`;
    }
    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search ||'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/posts",newPost);
export const updatePost = (id,updatePost) => API.patch(`/posts/${id}`,updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`,id);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`,id);


export const signIn = (formData) => API.post("/user/signin",formData);
export const signUp = (formData) => API.post("/user/signup",formData);