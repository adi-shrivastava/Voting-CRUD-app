const Candidate = require('../models/candidate');
const Voter=require('./../models/voter');
const { jwtauthmiddleware, generateToken } = require('../middleware/jwt');

exports.addcandidates = async (req, res) => {
    try {
        
        const repeat=await Candidate.findOne({name:req.body.name,party:req.body.party});
        if(repeat){
            return res.status(400).json({message:"Candidate with same name and party already exists!"});
        }

        const data = req.body;
        const newcandidate = new Candidate(data);
        const savecandidate = await newcandidate.save();
        console.log("Saved in DB", savecandidate);
        res.status(200).json({ savecandidate: savecandidate, message: "Candidate added! " });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error Adding Candidate!" });
    }
}
exports.getcandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        console.log("Fetched Candidates!", candidates);
        res.status(200).json({ candidates: candidates });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error Fetching Candidates!" });
    }
}
exports.deletecandidates = async (req, res) => {
    try{
        const id = req.params.id;
        const deletecandidate = await Candidate.findByIdAndDelete(id);
        console.log("Deleted Candidate!", deletecandidate);
        res.status(200).json({ deletedcandidate: deletecandidate, message: "Candidate Deleted!" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Deleteing Candidate!"});
    }
}
exports.updatecandidates=async(req,res)=>{
    try{
        
        const id=req.params.id;
        const updatedata=req.body;
        const updatecandidate=await Candidate.findByIdAndUpdate(id,updatedata,{
            new: true,
            runValidators: true
        });
        console.log("Updated Candidate!",updatecandidate);
        res.status(200).json({ updatecandidate: updatecandidate, message: "Candidate Updated!" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Updating Candidate!"});
    }
}


