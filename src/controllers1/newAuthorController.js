// const newPublisher = require("../newModels/newPublisherModel")
// const newBook = require("../newModels/newBookModel")
const newAuthorModel = require("../newModels/newAuthorModel")
// 1. Write a POST api that creates an author from the details in request body

const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await newAuthorModel.create(author)
    res.send({data: authorCreated})
}

// const getAuthorsData= async function (req, res) {
    // let authors = await newAuthorModel.find()
    // res.send({data: authors})


module.exports.createAuthor= createAuthor