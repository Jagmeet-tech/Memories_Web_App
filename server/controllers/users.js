import bcrypt, { hash } from "bcrypt";  //password hash
import jwt from "jsonwebtoken";     // login token 
import User from "../models/user.js";

export const signin = async (req,res) =>{
    const {email , password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser)
            return res.status(404).json({message : "User doesn't exist."});
        
            const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect)
            return res.status(404).json({message : "Invalid Crediantials.."});

        //jwt(payload,secret,options)
        const token = jwt.sign({email : existingUser.email,id : existingUser._id},"test",{expiresIn : "1h"});
        res.status(200).json({userObject : existingUser,jwtGToken : token});
    } catch (error) {
        res.status(500).json({message : "Something went wrong.."});
    }
}

export const signup = async (req,res) =>{
    const {email,password,confirmPassword,firstName,lastName} = req.body;
    console.log("Email",email); 
    try {
        const existingUser = await User.findOne({email});
        if(existingUser)
            res.status(400).json({message: "User already exist."});

        if(password !== confirmPassword)
            res.status(400).json({message : "Password doesn't match."});
        
        const hashedPassword = await bcrypt.hash(password,12);
        console.log(hashedPassword);
        const result = await User.create({email : email,password : hashedPassword,name : `${firstName} ${lastName}`});
       
        console.log("Result user",result);
        const token = jwt.sign({email:email,id : result._id},"test",{expiresIn : "1h"});
        res.status(200).json({userObject : result, jwtGToken : token});
    } catch (error) {
        res.status(500).json({message : "Something went wrong.."});
    }
}