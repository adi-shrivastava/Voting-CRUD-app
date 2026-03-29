const express=require('express');
const router=express.Router();
const Candidate=require('../models/candidate');
const {jwtauthmiddleware}=require('./../jwt');
const Voter = require('../models/voter');
const adminrolecheck=async(userid)=>{
    try{
        const voter=await Voter.findById(userid);
        
        if(voter.role==='admin'){
            return true;
        }
        return false;
    }
    catch(err){
        return false;
    }
}
router.post('/addcandidate',jwtauthmiddleware,async(req,res)=>{
    try{
        if(!await adminrolecheck(req.user.id)){
            return res.status(403).json({message:"Forbidden! Admins Only!"});
        }
    
        const data=req.body;
        const newcandidate=new Candidate(data);
        const savecandidate=await newcandidate.save();
        console.log("Saved in DB",savecandidate);
        res.status(200).json({response:savecandidate,message:"Candidate added!"});
    }
    catch(err){
        
        res.status(500).json({message:"Error Adding Candidate!"});
    }
})
router.get('/getcandidate',async(req,res)=>{
    try{
        const candidates=await Candidate.find();
        console.log("Fetched Candidates!",candidates);
        res.status(200).json(candidates);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Fetching Candidates!"});
    }
})
router.delete('/:id',jwtauthmiddleware,async(req,res)=>{
    try{
        if(!await adminrolecheck(req.user.id)){
            return res.status(403).json({message:"Forbidden! Admins Only!"});
        }
        const id=req.params.id;
        const deletecandidate=await Candidate.findByIdAndDelete(id);
        console.log("Deleted Candidate!",deletecandidate);
        res.status(200).json({message:"Candidate Deleted!"});
    }
    catch(err){
         console.log("DELETE ERROR:", err);
        res.status(500).json({message:"Error Deleteing Candidate!"});
    }
})
router.put('/:id',jwtauthmiddleware,async(req,res)=>{
    try{
        if(! await adminrolecheck(req.user.id)){
            return res.status(403).json({message:"Forbidden! Admins Only!"});
        }
        const id=req.params.id;
        const updatedata=req.body;
        const updatecandidate=await Candidate.findByIdAndUpdate(id,updatedata,{
            new: true,
            runValidators: true
        });
        console.log("Updated Candidate!",updatecandidate);
        res.status(200).json({message:"Candidate Updated!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Updating Candidate!"});
    }
})
module.exports=router;