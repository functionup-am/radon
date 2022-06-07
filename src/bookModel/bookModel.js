const mongoose = require('mongoose');

const bookModelSchema = new mongoose.Schema( {
        bookName: {
            type: String,
            required: true
         },
        authorName: String,
         prices: {
            indianPrice: String,
            europePrice: String,
        },
        isPublished: Boolean,
        tags: [ String],
        totalPages: String,
        stockAvailable: Boolean,
        year: {type: Number, default: 2021}
    }, { timestamps: true });


    module.exports = mongoose.model('bookModel', bookModelSchema)
   


   




















