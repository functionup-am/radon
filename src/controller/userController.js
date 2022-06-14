const userModel = require("../mwModel/userModel")

// Write a POST api to create a user that takes user details from the request body. If the header **isFreeAppUser** is not present terminate the request response cycle with an error message that the request is missing a mandatory header
let createUser = async function (req,res,){
    let data =req.body
let savedData = await userModel.create(data)
res.send ({msg: savedData })
}

   module.exports.createUser = createUser