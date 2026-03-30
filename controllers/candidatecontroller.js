const candidateroutes=require('./../Routes/candidateroutes');
const Candidate=require('../models/candidate');
const {jwtauthmiddleware,generateToken}=require('./../jwt');
const Voter = require('../models/voter');
