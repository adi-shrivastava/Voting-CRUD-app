const mongoose=require('mongoose');
const voterschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    aadhar:{
        type:Number,
        required:true
    },
    voter:{
        type:Boolean,
        required:true
    }
})
const Voter=mongoose.model('Voter',voterschema);
module.exports=Voter;