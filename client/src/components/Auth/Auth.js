import React, { useEffect, useState } from 'react'
import {Paper,Avatar,Button,Grid,Typography,Container, TextField} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
// import {GoogleLogin} from "react-google-login";
import { GoogleLogin } from '@react-oauth/google';
import Icon from "./icon";
import jwt_decode from "jwt-decode";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";

const Auth = () => {
    const classes  = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    // let isSignUp = true;
    const [showPassword,setShowPassword] = useState(false);
    const [isSignUp,setIsSignUp] = useState(true);

    const handleSubmit = () =>{

    }

    const handleChange = () => {

    }

    const handleShowPassword = () =>{
        setShowPassword((prevShowPassword) => !prevShowPassword)
    } 

    const switchMode = () => {
      setIsSignUp(!isSignUp);
      handleShowPassword(false);
    }

    const googleSuccess = (res)=>{
      console.log("Success");
      const jwtGToken = res?.credential; 
      const userObject = jwt_decode(jwtGToken);
      dispatch({type : "AUTH", data : {jwtGToken,userObject}});

      history.push("/");
    }

    const googleFailure = (error)=>{
      console.log(error);
      console.log("Google Sign In was unsuccessfull. Try again Later!");
    }
    
    return (
      <Container component= "main" maxWidth = "xs"> 
          <Paper className = {classes.paper} elevation={3}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant='h5'>{isSignUp ? "SignUp" : "Sign In"}</Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing = {2}>
                      {
                        isSignUp &&(
                          <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                            <Input name="firstName" label="First Name" handleChange={handleChange} half/>
                          </>
                        )
                      }
                      <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                      <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword} />
                      {isSignUp && <Input name = "confirmPassword" label="Repeat Password" handleChange={handleChange} type = "password"/>}
                  </Grid>
                  <Button type = "submit" fullWidth variant='contained' color='primary' className={classes.submit}>  
                      {isSignUp ? "SignUp" : "SignIn"}
                  </Button>
                  {/* <GoogleLogin
                    clientId='<Google Client ID>'
                    render={(renderProps) =>(
                      <Button 
                        className={classes.googleButton} 
                        color='primary' 
                        fullWidth 
                        onClick = {renderProps.onClick} 
                        disabled = {renderProps.disabled}
                        startIcon = {<Icon/>} 
                        variant='contained'
                      >Google Sign In
                      </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                  /> */}
                  <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
                  <Grid container justifyContent='center'>
                      <Grid item>
                          <Button onClick={switchMode}>
                            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                          </Button>
                      </Grid>
                  </Grid>
              </form> 
          </Paper>
      </Container>
    );
}

export default Auth