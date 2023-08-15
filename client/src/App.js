import  React,{useEffect, useState} from "react";
import {Container,AppBar,Typography,Grow,Grid} from "@material-ui/core";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import {useDispatch} from "react-redux";
import {getPosts} from "./actions/posts";

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId,setCurrentId] = useState(null);    //props drilling:- (passing state changer to all deep child who can change it. and it reflects on parent components.)

    useEffect(()=>{
        dispatch(getPosts()); //dispatch an action
    },[currentId,dispatch])

    return (
        <Container maxidth = "lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src = {memories} alt = "memories" align = "center" height = "60"/>
            </AppBar>

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
        </Container>
    )
}

export default App;