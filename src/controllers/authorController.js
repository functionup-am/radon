const authormodel = require("../models/authorModel");
const validator = require("validator");
const jwt =require('jsonwebtoken')

// ### Author APIs /authors
// - Create an author - atleast 5 authors
// - Create a author document from request body.

const createauthor = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty" });
    
    if (!data.fname) return res.status(400).send({ status: false, msg: "Please enter First Name" });
        if(typeof data.fname !== 'string') return res.status(400).send({ status: false, msg: " Please enter first name as a String" });

    if (!data.lname)return res.status(400).send({ status: false, msg: "Please enter Last Name" });
        if(typeof data.lname !== 'string') return res.status(400).send({ status: false, msg: "Please enter last name as a String" });
    
    if (!data.title) return res.status(400).send({ status: false, msg: " Please enter Title" });
        if(typeof data.title !== 'string') return res.status(400).send({ status: false, msg: "Please enter title as a String" });
        // console.log(data.title)
        let titles=['Mr', 'Mrs', 'Miss'];
        if(!(titles.includes(data.title)))return res.status(400).send({ status: false, msg: "Please enter title as Mr, Mrs or Miss only" });
    
    if (!data.password) return res.status(400).send({ status: false, msg: "Please enter Password" });    
        if(typeof data.password !== 'string') return res.status(400).send({ status: false, msg: " Please enter password as a String" });
    
    if (!data.email) return res.status(400).send({ status: false, msg: "Please enter E-mail" });
        if(typeof data.email !== 'string') return res.status(400).send({ status: false, msg: "Please enter email as a String" });
    
    let email = data.email;
    if (!validator.isEmail(email))
      return res.status(400).send({ status: false, msg: "Entered email is invalid" });
    
    let save = await authormodel.create(data);
    res.status(201).send({ status: true, data: save });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const loginAuthor= async function(req,res){
    let data = req.body
    let userEmail= data.email
    let userPassword= data.password

    let checkCred= await authormodel.findOne({email: userEmail,password:userPassword})
    if(!checkCred) return res.status(400).send({status:false, msg:"Email or password is incorrect"})

    let token= jwt.sign({
      authorId: checkCred._id.toString(),
      batch:"Radon"
    }, "project1-AADI");
    res.setHeader("x-api-key",token)
    res.status(201).send({status:true,data: token})          
}

module.exports = { createauthor,loginAuthor };
