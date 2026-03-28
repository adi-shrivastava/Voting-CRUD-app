const mongoose=require('mongoose');
const MongoURL="mongodb://localhost:27017/VotingCRUD"; 
mongoose.connect(MongoURL);
const db=mongoose.connection; //cursor made
db.on("connected",()=>{
    console.log("MongoDB connected successfully!");
})
db.on("error",()=>{
    console.log("MongoDB connection failed!");
})
db.on("disconnected",()=>{
    console.log("MongoDB disconnected!");
})
module.exports=mongoose;