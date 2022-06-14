const productModel = require("../mwModel/productModel")


// Write a POST api to create a product from the product details in request body. 

let createProduct = async function (req,res){
 let data =req.body
let savedData = await productModel.create(data)
res.send ({msg: savedData })
}

module.exports.createProduct = createProduct



