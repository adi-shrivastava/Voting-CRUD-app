const express=require('express');
const app=express();
const db=require('./db');
app.get('/',(req,res)=>{
    res.send("Welcome to Voting CRUD Homepage!");
})
app.listen(3000,()=>{
    console.log("Server is live! and running on port 3000");
})