import React from 'react';
import useStyles from "./styles";
import { Card,CardActions,CardMedia,CardContent,Button,Typography,ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import {useDispatch} from "react-redux";
import { deletePost,likePost } from "../../../actions/posts";
import {useHistory} from "react-router-dom";


 const Post = ({post , setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    const history = useHistory();

    const Likes = () =>{    //likes component
        if(post.likes.length > 0){
            return post.likes.find((like) => like === (user?.userObject?.googleId || user?.userObject?._id))
            ? (
                <><ThumbUpAltIcon fontSize='small'/>&nbsp;{post.likes.length > 2  ? `You and ${post.likes.length - 1 } others` : `${post.likes.length} Like${post.likes.length > 1 ? "s" : ""}`}</>
            ):(
                <><ThumbUpAltOutlined fontSize='small' />&nbsp;{post.likes.length}{post.likes.length === 1 ? "Like" : "Likes"}</>
            )
        }

        return <> <ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>;
    }

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    }


    return (
        <Card className={classes.card} raised elevation={6}> 
           <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image = {post.selectedFile} title = {post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.userObject.googleId === post?.creator || user?.userObject?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color : "white"}} size="small" onClick={() => {setCurrentId(post._id)}}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>  
                </div>
                )}
                <div className={classes.details}>
                    <Typography variant= "body2" color='textSecondary'>{post.tags.map((tag) => `#${tag}`)}</Typography>
                </div>
                <Typography className={classes.title} variant = "h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                <Typography variant = "body2" color='textSecondary' component= "p">{post.message}</Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled = {!user?.userObject} onClick = {() => {dispatch(likePost(post._id))}}>
                    <Likes/>
                </Button>

                {(user?.userObject.googleId === post?.creator || user?.userObject?._id === post?.creator) && (
                <Button size='small' color='primary' onClick = {() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize='small'/>
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    ) 
}

export default Post;