import jwt , {decode} from "jsonwebtoken";

//Middleware : Like controller but check authorization for a resource but have next() fn.
//middleware can manipulate the request.
//Ex: User want to like a post
//Click like button -> auth middleware check authorized or not. -> if it is call next() for liking a post;
const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;    //user extract
        if(token && isCustomAuth){  
            decodedData = jwt.verify(token,"test");
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);    //google jwt
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}  

export default auth;