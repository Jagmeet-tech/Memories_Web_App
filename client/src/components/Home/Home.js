import React, { useEffect, useState } from 'react'
import {AppBar,Typography,Grow,Grid, Container} from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Home = () => {
    const dispatch = useDispatch();
    const [currentId,setCurrentId] = useState(null);    //props drilling:- (passing state changer to all deep child who can change it. and it reflects on parent components.)

    useEffect(()=>{
        dispatch(getPosts()); //dispatch an action
    },[currentId,dispatch])

  return (
    <Grow in>
        <Container>
            <Grid className="mainContainer" container justify = "space-between" alignItems="stretch" spacing = {3}>
                <Grid item xs = {12} sm = {7}>
                        <Posts setCurrentId = {setCurrentId} />
                </Grid>
                <Grid item xs = {12} sm = {4}>
                    <Form setCurrentId = {setCurrentId} currentId = {currentId} />
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home