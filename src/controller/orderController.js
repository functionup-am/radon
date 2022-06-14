// const { count } = require("console")
   const orderModel= require("../mwModels/orderModel")
   const userModel= require("../mwModels/userModel")
   const productModel= require("../mwModels/productModel")
//    Write a POST api for order purchase that takes a userId and a productId in request body. 
   const createOrder= async function (req, res) {   
        let data = req.body
       let userdata= req.body.userId
       let productdata = req.body.productId
    //    If the header **isFreeAppUser** is not present terminate the request response cycle with an error message that the request is missing a mandatory header
       if(!userdata) return res.send({msg: 'userId is mandatory in the request'})
    //    If the header is present the control goes to the request handler. Perform the user and product validation. Check if the user exists as well as whether the product exists. Return an error with a suitable error message if either of these validations fail
      let Uservalidation= await userModel.findById(req.body.userId)   
       if(!Uservalidation) return res.send({msg: "user id is not valid object id"})
   
       
   if(!productdata)return res.send({msg: 'productId is mandatory in the request'})
//    For every purchase we save an order document in the orders collection. isFreeAppUser property in an Order document depends on the header **isFreeAppUser**. If the **isFreeAppUser** header is true then the balance of the user is not deducted and the amount in order is set to 0 as well the attribute in order **isFreeAppUser** is set to true. If this header has a false value then the product’s price is checked. This value is deducted from the user’s balance and the order amount is set to the product’s price as well as the attrbiute **isFreeAppUser** is set to false in order document.
   let Productvalidation= await productModel.findById(req.body.productId)
   if(!Productvalidation) return res.send({msg: "product id is not valid object id"})
   
      else{let savedData= await orderModel.create(data)
       res.send({data: savedData}) }
   }
   
   module.exports.createOrder= createOrder