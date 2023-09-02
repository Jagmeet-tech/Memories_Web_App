import * as api from "../api";
import {FETCH_BY_SEARCH,FETCH_ALL,CREATE,UPDATE,DELETE, START_LOADING, END_LOADING } from "../constants/actionTypes";

//Action creators

export const getPosts = (page) => async(dispatch) => {  //thunk : fun. returns a fn.
    try {
        dispatch({type : START_LOADING });
        const {data} = await api.fetchPosts(page);
        console.log("data",data);
        dispatch({type : FETCH_ALL,payload : data});      //an action dispatched to save response data in redux state.
        dispatch({type : END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({type : START_LOADING });
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery);
        console.log(data);
        dispatch({type : FETCH_BY_SEARCH,payload : data});
        dispatch({type : END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({type : START_LOADING });
        const {data} = await api.createPost(post);
        dispatch({type : CREATE , payload : data});
        dispatch({type : END_LOADING });
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
