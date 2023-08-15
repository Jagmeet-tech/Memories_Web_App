import * as api from "../api";
import { FETCH_ALL,CREATE,UPDATE,DELETE } from "../constants/actionTypes";

//Action creators

export const getPosts = () => async(dispatch) => {  //thunk : fun. returns a fn.
    try {
        const {data} = await api.fetchPosts();
        dispatch({type : FETCH_ALL,payload : data});      //an action dispatched to save response data in redux state.
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        dispatch({type : CREATE , payload : data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id,post) => async (dispatch) => {
    try {
       const {data} =  await api.updatePost(id,post);  //calls api
       dispatch({type : UPDATE ,payload : data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) =>{
    try {
        await api.deletePost(id);
        dispatch({type : DELETE,payload : id});   
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type : UPDATE,payload : data});
    } catch (error) {
        console.log(error);
    }
}