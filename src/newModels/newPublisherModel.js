const mongoose = require('mongoose');

const newPublisherSchema = new mongoose.Schema( {
    name: String,
    headquarter: String

}, { timestamps: true });
    
module.exports = mongoose.model('Publisher', newPublisherSchema)
