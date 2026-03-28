const express=require('express');
const app=express();
app.use(express.json());
const db=require('./db');
const candidate=require('./models/candidate');
console.log(candidate);
const voter=require('./models/voter');
const bodyparser=require('body-parser');
const candidateroutes=require('./Routes/candidateroutes');
const voterroutes=require('./Routes/voterroutes');
app.use(bodyparser.json());
const logrequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to ${req.url} with method ${req.method}`);
    next();
}
app.use(logrequest);
app.use('/candidate',candidateroutes);
console.log(candidateroutes);

app.get('/',(req,res)=>{
    res.send("Welcome to Voting CRUD Homepage!");
})
app.listen(3000,()=>{
    console.log("Server is live! and running on port 3000");
})