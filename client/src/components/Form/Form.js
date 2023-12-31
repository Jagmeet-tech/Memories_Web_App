import React,{useEffect, useState} from 'react';
import useStyles from "./styles";
import { TextField,Button,Typography,Paper } from '@material-ui/core';
import FileBase from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import { createPost,getPosts,updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';

const Form = ({currentId,setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history =  useHistory();
  // useSelector((state)=> console.log(state));
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);   //specific post fetched from redux store(reducer).
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData,setPostData] = useState({
    title : "", message : "",tags : "",selectedFile : ""
  });

  useEffect(()=>{
    if(post)
      setPostData(post);  //form filled with selected post values.
  },[post]);

  //Form data submits -> Triggers anction through dispatch -> action calls api to perform server action -> response from server saves in the redux store(reducer.)
  const handleSubmit = (e)=>{
      e.preventDefault();

      if(currentId){
        dispatch(updatePost(currentId,{...postData,name : user?.userObject?.name}));   
      }else{
        dispatch(createPost({...postData,name : user?.userObject?.name},history));
      }
      clear();
  }

  const clear = () =>{
      setCurrentId(null);
      setPostData({ title : "", message : "",tags : "",selectedFile : ""});
  }

  console.log(user?.userObject?.name.length);
  if(user?.userObject?.name.length == undefined){
    return(
      <Paper className={classes.paper}> 
          <Typography variant='h6' align='center'>
              Please Sign In To create your own memories and like other memories.
          </Typography>
      </Paper>
    )
  }
    
  return (
    <Paper className = {classes.paper} elevation={8}>
        <form autoComplete =  "off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? "Editing" : "Inserting"} a Memory</Typography>
        {/* new refernce use always(spread operator) */}
          {/* <TextField name = "creator" variant='outlined' label = "Creator" fullWidth value = {postData.creator} onChange = {(e) => setPostData({...postData , creator : e.target.value})} />  */}
          <TextField name = "title" variant='outlined' label = "Title" fullWidth value = {postData.title} onChange = {(e) => setPostData({...postData , title : e.target.value})} /> 
          <TextField name = "message" variant='outlined' label = "Message" fullWidth value = {postData.message} onChange = {(e) => setPostData({...postData , message : e.target.value})} /> 
          <TextField name = "tags" variant='outlined' label = "Tags" fullWidth value = {postData.tags} onChange = {(e) => setPostData({...postData , tags : e.target.value.split(",")})} /> 
          <div className={classes.fileInput}>
              <FileBase
                type = "file"
                multiple = {false}
                onDone = {({base64}) => setPostData({...postData , selectedFile : base64})}
              />
          </div>
          <Button className={classes.buttonSubmit} variant = "contained" color='primary' size = "large" type = "submit" fullWidth>Submit</Button>
          <Button  variant = "contained" color='secondary' size = "small" onClick = {clear} fullWidth>Clear</Button>
        
        </form>
    </Paper>
  )
}

export default Form;