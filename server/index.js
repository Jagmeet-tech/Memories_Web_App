import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import postsRouter from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({limit : "30mb", extended : "true"}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : "true"}));
app.use(cors());


app.use("/posts",postsRouter);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT =  process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser : true,useUnifiedTopology : true})
.then(()=>{
    console.log("MongoDB is connected successfully...");
}).catch((err)=>{
    console.log(err.message);
});

// mongoose.set("useFindAndModify",false);
// mongoose.set('debug, true');

app.listen(PORT,()=>{
    console.log(`Server is running on the port : ${PORT}`);
})


