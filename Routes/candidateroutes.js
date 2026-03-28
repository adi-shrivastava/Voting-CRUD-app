const express=require('express');
const router=express.Router();
const Candidate=require('../models/candidate');
router.post('/addcandidate',async(req,res)=>{
    try{
        const {name,party}=req.body;
        const candidate=new Candidate({name,party});
        const savecandidate=await candidate.save();
        console.log("Saved in DB",savecandidate);
        res.status(200).json({message:"Candidate added!"});
    }
    catch(err){
        res.status(500).json({message:"Error Adding Candidate!"});
    }
})
router.get('/getcandidates',async(req,res)=>{
    try{
        const candidates=await Candidates.find();
        console.log("Fetched Candidates!");
        res.status(200).json({message:"Candidates Fetched!"},candidates);
    }
    catch(err){
        res.status(500).json({message:"Error Fetching Candidatse!"},err);
    }
})
module.exports=router;