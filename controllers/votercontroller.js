const Voter=require('../models/voter');
const {jwtauthmiddleware,generateToken}=require('../middleware/jwt');
const candidate=require('../models/candidate');
exports.signup=async(req,res)=>{
    try{
        const repeat=await Voter.findOne({aadhar:req.body.aadhar,name:req.body.name});
        if(repeat){
            console.log("Voter with same Aadhar and Name already exists!");
            return res.status(400).json({message:"Voter with same Aadhar and Name already exists!"});
        }
        const data=req.body
        const newVoter=new Voter(data);
        const adminexists=await Voter.findOne({role:'admin'});
        if(adminexists && data.role && data.role==='admin'){
            return res.status(403).json({message:"Forbidden! Admin Already Exists!"});
        }
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
}
exports.login=async(req,res)=>{
    try{
        
        const{aadhar,password}=req.body;
        const findvoter=await voter.findOne({aadhar:aadhar});
        console.log("Found Voter!",findvoter);
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
}
exports.getprofile=async(req,res)=>{
    try{
        const userid=req.user.id;
        const voterprofile=await Voter.findById(userid);
        console.log("Voter Profile Fetched!",voterprofile);
        res.status(200).json(voterprofile);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Fetching Profile!"});
    }
}
exports.updatepassword=async(req,res)=>{
    try{
        const userid=req.user.id;
        const{currentpassword,newpassword}=req.body;
        const voter=await Voter.findById(userid);
        if(!await voter.comparepassword(currentpassword,voter.password)){
            return res.status(401).json({message:"Incorrect Password!"});
        }
        voter.password=newpassword;
        console.log(voter.password);
        await voter.save();
        console.log("Password Updated!");
        res.status(200).json({message:"Password Updated!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Updating Password!"});
    }
}
//Voting Logic 
exports.vote=async(req,res)=>{
    const voterdata=await Voter.findById(req.user.id).populate('votedFor'); // Storing with more details of which candidate is voted
    if(voterdata.hasvoted){
        return res.status(400).json({message:"You have already voted!"});
    }
    const candidatedata=await candidate.findById(req.params.candidateid);
    try{
        //Marking Voting of candidate
        //Voted For?!
        await Voter.findByIdAndUpdate(req.user.id,{hasvoted:true,votedFor:candidatedata._id});
        //Vote Count!
        await candidate.findByIdAndUpdate(req.params.candidateid,{$inc:{votecount:1}});
        res.status(200).json({},{message:"Voted Successfully!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Voting!"});
    }
}
