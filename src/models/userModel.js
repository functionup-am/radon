const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String,
    authorName: String,
    category: {
        type: String,
        unique: true,
        required: false
    },
    year: {
        type: String,
        unique: true,
        required: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Books', bookSchema) //books



// String, Number
// Boolean, Object/json, array