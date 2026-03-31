const candidate=require('../models/candidate');
const candidatecontroller=require('../controllers/candidatecontroller'); 
const votercontroller=require('../controllers/votercontroller');
const Voter = require('../models/voter');
console.log("Admin Check Middleware Loaded!");
exports.admincheck=async(req,res,next)=>{
    try{
        const userid=req.user.id;
        const voter=await Voter.findById(userid);
        if(voter.role!=='admin'){
            return res.status(403).json({message:"Admin Access Only!"})
        }
        next();
    }

    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Checking Admin Role!"});
    }
}
