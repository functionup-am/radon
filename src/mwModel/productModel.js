const mongoose = require('mongoose');
const productModelSchema = new mongoose.Schema ({
name: String,
category:{
    type: String,
    required: true
 },
	price: {
        type: Number,
        required: true
     },
     //mandatory property
} ,{timestamps: true});

module.exports = mongoose.model('Product', productModelSchema)