const bookModel = require("../BookModel1/bookModel")
const authorModel = require("../authorModel/authorModel")
// Write create APIs for both books and authors ---> If author_id is not available then do not accept the entry(in neither the author collection nor the books collection)

let createAuthor = async function (req,res){
    let data = req.body
    let savedData = await authorModel.create(data)
    res.send({msg: savedData})
}

let createBook = async function (req,res){
    let data = req.body
    let saveData = await bookModel.create(data)
    res.send({msg: saveData})
}
// List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another- first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )

let getBooksChetanBhagat = async function (req,res){
    let data = await authorModel.find({authorName: "Chetan Bhagat"}).select("authorId")
    let bookData = await bookModel.find({author_id: data[0].author_id})
    res.send({msg: bookData})
}
// find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)

let authorOfBook = async(req,res)=>{
    let data = await bookModel.findOneAndUpdate({bookName: "Two States"},{$set:{prices:100}},{new:true})
    // let authorData = await bookModel.find({author_id:data[0].author_id})
    // let price = data.prices
    res.send({msg: data})
}
// Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 

let bookBetween50_100 = async(req,res)=>{
   let  data = await bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id:1})
//    let bookBw = await bookModel.forEach{
//     if (data.length>0)
       res.send({msg: data})
}


module.exports.createAuthor = createAuthor
module.exports.createBook = createBook
module.exports.getBooksChetanBhagat = getBooksChetanBhagat
module.exports.authorOfBook = authorOfBook
module.exports.bookBetween50_100 = bookBetween50_100