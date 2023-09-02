import  React from "react";
import {Container} from "@material-ui/core";
import useStyles from "./styles";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter,Switch,Route,Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    //localstorage save -> string JSON.toString() and retrive to get json object back from string using JSON.parse();
    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <BrowserRouter>
            <Container maxidth = "xl">
                <Navbar/>
                <Switch>
                    <Route path = "/" exact component = {() => <Redirect to = "/posts" />}/>
                    <Route path = "/posts" exact component = {Home}/>
                    <Route path = "/posts/search" exact component = {Home}/>
                    <Route path = "/posts/:id" component = {PostDetails}/>
                    <Route path = "/auth" exact component = {() => (!user ? <Auth/> : <Redirect to  = "/posts/"/>)}/>
                </Switch>
                {/* <Home/> */}
            </Container>
        </BrowserRouter>
    )
}

export default App;