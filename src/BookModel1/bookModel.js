const mongoose = require('mongoose');

const bookModelSchema = new mongoose.Schema({
        bookName: {
            type: String
        },
        author_id:{
            type: Number,
            required: String
        },
        prices: Number,
        ratings: Number
    },   {timestamps: true});

    module.exports = mongoose.model('bookModel', bookModelSchema)