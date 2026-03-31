const express=require('express');
const router=express.Router();
const Candidate=require('../models/candidate');
const {jwtauthmiddleware}=require('../middleware/jwt');
const {admincheck}=require('../middleware/rolecheck');
console.log(admincheck);
const{addcandidates,getcandidates,deletecandidates,updatecandidates}=require('./../controllers/candidatecontroller');
console.log(admincheck,getcandidates);
router.get('/',jwtauthmiddleware,admincheck,getcandidates);

router.post('/add',jwtauthmiddleware,admincheck,addcandidates);
router.delete('/:id',jwtauthmiddleware,admincheck,deletecandidates);
router.put('/:id',jwtauthmiddleware,admincheck,updatecandidates);
module.exports=router;