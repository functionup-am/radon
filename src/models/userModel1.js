const mongoose = require('mongoose');
const userModel1Schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: {
        type: String,

        required: true
    },
    emailId: String,
    password: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    isDeleted:{
        type: String,
        default: false
    },
    age: Number,
}, { timestamps: true });

module.exports = mongoose.model('UserModel1', userModel1Schema)










