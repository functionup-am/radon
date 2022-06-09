const newAuthor = require("../newModels/newAuthorModel")
const newPublisher = require("../newModels/newPublisherModel")
const newBookModel = require("../newModels/newBookModel")

const createBook= async function (req, res) {
    let book = req.body
    let bookCreated = await newBookModel.create(book)
    res.send({data: bookCreated})
}

// const getBooksData= async function (req, res) {
//     let books = await newBookModel.find()
//     res.send({data: books})

// The authorId is present in the request body. If absent send an error message that this detail is required
const getBooksData =async function(req,res){
    let allbooks = await newBookModel.findById("62a1f1b6c8d503633d60514a")
    if(allbooks) res.send({msg: allbooks,condition: true})
    else res.send({msg: "Id not found"})
}
// If present, make sure the authorId is a valid ObjectId in the author collection. If not then send an error message that the author is not present.
const getBooks1Data = async function(req,res){
    let allBooks = await newBookModel.findById("62a1f38ac8d503633d60514c")
    if(allBooks) res.send({msg: allbooks,condition: true})
    else res.send({msg: "author is not found"})
}
// The publisherId is present in the request body. If absent send an error message that this detail is required

const getBooks2Data =async function(req,res){
    let allbooks = await newBookModel.findById("62a1fa3ac7fddf625fcc792d")
    if(allbooks) res.send({msg: allbooks,condition: true})
    else res.send({msg: "his detailed is required"})
}
// If present, make sure the publisherId is a valid ObjectId in the publisher collection. If not then send an error message that the publisher is not present.

const getBooks3Data = async function(req,res){
    let allBooks = await newBookModel.findById("62a1fb3feb91e891b39ceb1f")
    if(allBooks) res.send({msg: allbooks,condition: true})
    else res.send({msg: "publisher is not present"})
}
const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await newBookModel.find().populate('author_id','publisher_id')
    res.send({data: specificBook})
}
module.exports.getBooksData = getBooksData
module.exports.getBooks1Data = getBooks1Data
module.exports.getBooks2Data = getBooks2Data
module.exports.getBooks3Data = getBooks3Data
module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
