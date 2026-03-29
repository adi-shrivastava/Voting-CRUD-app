const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const jwtauthmiddleware=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]; //bearer <token> 
    console.log("received token",token);
    if(!token){
        return res.status(401).json({message:"Unauthorized!"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        console.log("Decoded Token:", decoded);
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({message:"Invalid Token!"});
    }
}
//token generation
const generateToken=(userdata)=>{
    const token=jwt.sign({id:userdata.id,name:userdata.name},process.env.JWT_SECRET,{expiresIn:'1h'});
    return token;
}
module.exports={jwtauthmiddleware,generateToken};