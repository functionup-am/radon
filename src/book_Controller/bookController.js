const bookModel = require("../BookModel1/bookModel")
const authorModel = require("../authorModel/authorModel")

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

let getBooksChetanBhagat = async function (req,res){
    let data = await authorModel.find({authorName: "Chetan Bhagat"}).select("authorId")
    let bookData = await bookModel.find({author_id: data[0].author_id})
    res.send({msg: bookData})
}
 
let authorOfBook = async(req,res)=>{
    let data = await bookModel.findOneAndUpdate({bookName: "Two States"},{$set:{prices:100}},{new:true})
    // let authorData = await bookModel.find({author_id:data[0].author_id})
    // let price = data.prices
    res.send({msg: data})
}

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