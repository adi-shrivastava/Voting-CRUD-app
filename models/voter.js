const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const voterschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    aadhar: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    hasvoted: {
        type: Boolean,
        default: false
    },
    votedFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        default: null
    }

})
//hasing password
voterschema.pre('save', async function (next) {
    const voter = this;
    if (!voter.isModified('password')) return next();
    try {
        //added salt
        const salt = await bcrypt.genSalt(10);
        //hashed pass
        const hashedpassword = await bcrypt.hash(voter.password, salt);
        //Rewriting the password with hashed password
        voter.password = hashedpassword;
        next();
    }
    catch (err) {
        console.log(err);
    }
})
//compare password method
voterschema.methods.comparepassword = async function (voterpassword) {
    try {
        const isMatch = await bcrypt.compare(voterpassword, this.password);
        return isMatch;
    }
    catch (err) {
        console.log(err);

    }
}
const Voter = mongoose.model('Voter', voterschema);
module.exports = Voter;