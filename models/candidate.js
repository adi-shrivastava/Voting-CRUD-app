const mongoose=require('mongoose');
const candidateschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    party:{
        type:String,
        required:true
    }
})
const Candidate=mongoose.model('Candidate',candidateschema);
module.exports=Candidate;
