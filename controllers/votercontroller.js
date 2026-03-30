const voterroutes=require('./../Routes/voterroutes');
const Voter=require('../models/voter');
const {jwtauthmiddleware,generateToken}=require('./../jwt');
exports.signup=async(req,res)=>{
    try{
        
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
exports.getprofile=jwtauthmiddleware,async(req,res)=>{
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
}
exports.updatepassword=jwtauthmiddleware,async(req,res)=>{
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
}
