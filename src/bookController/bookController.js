const bookModel= require("../bookModel/bookModel")
// createBook : to create a new entry..use this api to create 11+ entries in your collection

const createBookModel= async function (req, res) {
    let data= req.body
    let savedData= await bookModel.create(data)
    res.send({msg: savedData})
}

const getBookModelData= async function (req, res) {
    let allUsers = await bookModel.find()
    res.send({msg: allUsers})
}
// bookList : gives all the books- their bookName and authorName only 
  const bookList =  async function (req,res){
   let allBooks= await bookModel.find( { }).select( {bookName : 1, authorName:1, _id: 0})
   res.send({msg:allBooks})
}
//getBooksInYear: takes year as input in post request and gives list of all books published that year 
const getBooksInYear =  async function (req,res){
     let year = req.body.year
     let yearBooks= await bookModel.find(  {"year": year}  )  //"year": 1995, isPublished: true //{ year: publishedYear}
     res.send({msg:yearBooks})
}   
// getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition
const  getParticularBooks = async function(req,res){
    let condition = req.body
    let newBooks= await bookModel.find( condition )  //({"year": 1992})
    res.send({msg: newBooks})
}
//getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR”  
const getXINRBooks =async function(req,res){
    let priceBooks= await bookModel.find( {
     "prices.indianPrice": {$in: ["100INR","200INR","500INR"]},     //({price["indianPrice"]: {$in:["100INR","200INR","500INR"]}})
    })
     res.send({msg: priceBooks})
}
//getRandomBooks - returns books that are available in stock or have more than 500 pages  
const getRandomBooks = async function(req,res){
    let availableBooks = await bookModel.find({
        $or: [ {stockAvailable: true }, {totalPages: {$gt:300}} ]  })
      res.send({msg: availableBooks})
}
module.exports.getRandomBooks = getRandomBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getParticularBooks =getParticularBooks
module.exports.getBooksInYear = getBooksInYear
module.exports.bookList = bookList
module.exports.createBookModel= createBookModel
module.exports.getBookModelData= getBookModelData