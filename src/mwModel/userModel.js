const mongoose = require('mongoose');
const userModelSchema = new mongoose.Schema ({
    name: String,
	balance:{
		type: Number,
		default: 100
	 },          // Default balance at user registration is 100
	address: {
		type: String, 
	},
	age: Number,
 	gender: {
		type: String,
		enum: ["male","female","others"]
	}, // Allowed values are - “male”, “female”, “other”
}, {timestamps: true} );


module.exports = mongoose.model('UserModel', userModelSchema) //