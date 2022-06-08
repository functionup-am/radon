const mongoose = require('mongoose');

const authorModelSchema = new mongoose.Schema( {
    author_id: {
        type: Number,
        unique: true,
        required: true
    },
    authorName: String,
    age: Number,
    address: String
},{ timestamps: true})

module.exports = mongoose.model('authorModel', authorModelSchema)
    