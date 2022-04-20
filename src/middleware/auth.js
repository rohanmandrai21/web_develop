require('dotenv').config();
const jwt= require('jsonwebtoken');
const UserRegister=require('../models/web_develop');

const auth= async(req,res,next)=>{
    try{
        const token=req.cookies.webcookie;
       const tokenverify= jwt.verify(token,process.env.SECRET_KEY);
        // console.log(process.env.SECRET_KEY);
        // console.log(tokenverify);
         const userdata= await UserRegister.findOne({_id: tokenverify._id});
        //   console.log(user.firstname);
        req.token=token;
        req.userdata=userdata;
            next();
    }catch(error){
        res.status(401).send(error);
    }
}
module.exports= auth;