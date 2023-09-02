import React, { useEffect, useState } from 'react'
import {AppBar,Typography,Grow,Grid, Container,Paper,TextField,Button} from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from "../Pagination/Pagination";
import { useHistory,useLocation } from 'react-router-dom';
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";

function useQuery(){
    return new URLSearchParams(useLocation().search);   //to get serach params present in search url.
}

const Home = () => {
    const dispatch = useDispatch();
    const [currentId,setCurrentId] = useState(null);    //props drilling:- (passing state changer to all deep child who can change it. and it reflects on parent components.)
    const query = useQuery();   //to read urls query.
    const history = useHistory();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");
    const classes = useStyles();
    const [search,setSearch] = useState("");
    const [tags,setTags] = useState([]);

    // useEffect(()=>{
    //     console.log("dispatch called");
    //     dispatch(getPosts()); //dispatch an action
    // },[currentId,dispatch])

    const handleKeyPress = (e) =>{
        if(e.keyCode === 13){   //enter key press
            //search for the post.
        }    
    };
    const handleAdd = (tag) => setTags([...tags,tag]);
    const handleDelete = (tagToDelete) =>{
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }
    const searchPost = () => { 
        if(search.trim() || tags){
            //dispatch event for search post
            dispatch(getPostsBySearch({search : search, tags: tags.join(",")}));    //sending tags as a string is more convenient than sending tags array from frontend to backend.
            history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
        }else{
            history.push("/"); 
        }
    }

  return (
    <Grow in>
        <Container maxWidth = "xl">
            <Grid className="mainContainer" container justify = "space-between" alignItems="stretch" spacing = {3} className = {classes.gridContainer}>
                <Grid item xs = {12} sm = {6} md = {9}>
                        <Posts setCurrentId = {setCurrentId} />
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    <AppBar className={classes.appBarSearch} position='static' color = "inherit">
                        <TextField
                            name = "Search"
                            variant = "outlined"
                            label = "Search Memories"
                            fullWidth
                            value = {search}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ChipInput
                            style = {{margin:"10px 0"}}
                            value = {tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label = "SearchTags"
                            variant='outlined'
                        />
                       <Button onClick={searchPost} variant='contained' className={classes.searchButton} color = "primary">Search</Button> 
                    </AppBar>
                    <Form setCurrentId = {setCurrentId} currentId = {currentId} />
                    {(!searchQuery && !tags.length) && (
                    <Paper elevation={6}>
                        <Pagination page = {page}/>
                    </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home