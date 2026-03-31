const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const jwtauthmiddleware=(req,res,next)=>{
    const authheader=req.headers.authorization;
    if(!authheader || !authheader.startsWith("Bearer ")){
        return res.status(401).json({message:"Token is not provided! Authorization Denied!"});
    }
    const token=authheader.split(" ")[1]; //bearer <token>
    console.log("received token",token);
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        if(!req.user || !req.user.id){
            return res.status(401).json({message:"Token Damaged!"});
        }
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
    const token=jwt.sign({id:userdata.id,name:userdata.name,role:userdata.role},process.env.JWT_SECRET,{expiresIn:'8000h'});
    return token;
}
module.exports={jwtauthmiddleware,generateToken};