const express=require('express');
const router=express.Router();
const voter=require('../models/voter');
const {jwtauthmiddleware,generateToken}=require('./../jwt');
const Voter = require('../models/voter');
router.post('/signup',async(req,res)=>{
    try{
        existingadmin=await Voter.findOne({role:'admin'});
        if(!existingadmin){
            return true;
        }
        else{
            return res.status(403).json({message:"Admin already exists! Please login!"});
        }
        const data=req.body
        const newVoter=new Voter(data);
        const saveVoter=await newVoter.save();
        console.log(saveVoter);
        const payload={
            id:newVoter.id,
            name:newVoter.name
        }
        const token=generateToken(payload);
        console.log("Token is :",token);
        res.status(200).json({token:token, saveVoter:saveVoter});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Registering Voter!"});
    }
})
router.post('/login',async(req,res)=>{
    try{
        existingadmin=await Voter.findOne({role:'admin'});
        if(existingadmin){
            return res.status(403).json({message:"Admin already exists! Please login!"});
        }
        const{aadhar,password}=req.body;
        const findvoter=await voter.findOne({aadhar:aadhar});
        if(!findvoter || !(await findvoter.comparepassword(password))){
            return res.status(401).json({message:"Invalid Credentials!"});
        }
        
        const payload={
            id: findvoter.id,
            name:findvoter.name
        }
        const token=generateToken(payload);
        console.log("Token is :",token);
        res.status(200).json({response:findvoter,token:token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Logging In!"});
    }   
})
router.get('/profile',jwtauthmiddleware,async(req,res)=>{
    try{
        const userid=req.user.id;
        const voterprofile=await voter.findById(userid);
        console.log("Voter Profile Fetched!",voterprofile);
        res.status(200).json(voterprofile);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Fetching Profile!"});
    }
})
router.put('/profie/password',jwtauthmiddleware,async(req,res)=>{
    try{
        const userid=req.user.id;
        const{currentpassword,newpassword}=req.body;
        const voter=await voter.findById(userid);
        if(!await voter.comparepassword(currentpassword,voter.password)){
            return res.status(401).json({message:"Incorrect Password!"});
        }
        voter.password=newpassword;
        await voter.save();
        console.log("Password Updated!");
        res.status(200).json({message:"Password Updated!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Updating Password!"});
    }
})

module.exports=router;
