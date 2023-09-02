import React, { useState , useEffect} from 'react'
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core';
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import useStyles from "./styles.js";
import {Link} from "react-router-dom";
import { useHistory , useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    useEffect(()=>{
        const token = user?.jwtGToken;
        //JWT received from our server.

        //checking for logout if token expires.(1000 is milliseconds)
        if(token){
            const decodeToken = decode(token);
            if(decodeToken.exp * 1000 < new Date().getTime())
                logout();
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    },[location]);  //location is a state which manages url changes.

    const logout = () => {
        dispatch({type : "LOGOUT"});
        history.push("/");
        setUser(null);
    }
    
    return (
    <>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link  to = "/" className={classes.brandContainer}>
                <img src = {memoriesText} alt='icon' height = "45px" />
                <img className={classes.image} src = {memoriesLogo} alt = "icon" height = "40px"/>
            </Link>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt = {user?.userObject?.name} src= {user?.userObject?.picture}>{user?.userObject?.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant='h6'>{user?.userObject?.name}</Typography>
                            <Button contained className={classes.logout} color='secondary' onClick = { logout }>Logout</Button>
                        </div>
                    ):(
                        <Button component = {Link} to = "/auth" variant='contained' color = "primary" >Sign In</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar;