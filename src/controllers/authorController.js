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
    let validfname = /^\w[a-zA-Z.]*$/
      data.fname = data.fname.trim();
    if (!validfname.test(data.fname)) return res.status(400).send({ status: false, msg: "The fname may contain only letters"});
   
    if (!data.lname)return res.status(400).send({ status: false, msg: "Please enter Last Name" });
        if(typeof data.lname !== 'string') return res.status(400).send({ status: false, msg: "Please enter last name as a String" });
        let validlname =  /^\w[a-zA-Z.]*$/
        data.lname = data.lname.trim();
        if (!validlname.test(data.lname)) return res.status(400).send({ status: false, msg: "The lname may contain only letters"})

    // unique aa rha hai.(lname,fname)
    if (!data.title) return res.status(400).send({ status: false, msg: " Please enter Title" });
        if(typeof data.title !== 'string') return res.status(400).send({ status: false, msg: "Please enter title as a String" });
        // console.log(data.title)
        let titles=['Mr', 'Mrs', 'Miss'];
        data.title = data.title.trim();
        if(!(titles.includes(data.title)))return res.status(400).send({ status: false, msg: "Please enter title as Mr, Mrs or Miss only" });
    
    if (!data.password) return res.status(400).send({ status: false, msg: "Please enter Password" });    
        if(typeof data.password !== 'string') return res.status(400).send({ status: false, msg: " Please enter password as a String" });
    let validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!validPassword.test(data.password)) return res.status(400).send({ status: false, msg: "Please enter min 8 letter password, with at least a symbol, upper and lower case letters and a number" });    
        
    if (!data.email) return res.status(400).send({ status: false, msg: "Please enter E-mail" });
        if(typeof data.email !== 'string') return res.status(400).send({ status: false, msg: "Please enter email as a String" });
       
    let email = data.email;
    if (!validator.isEmail(email))
      return res.status(400).send({ status: false, msg: "Entered email is invalid" });
    let duplicateEmail = await authormodel.find({email: email});
    console.log(duplicateEmail.length);
    if (duplicateEmail.length!==0) return res.status(400).send({status: false, msg: "Email already exist"});
    let save = await authormodel.create(data);     
    res.status(201).send({ status: true, data: save });      
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const loginAuthor= async function(req,res){
  try{
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
  }catch (error) {
  res.status(500).send({ status: false, msg: error.message});
  }
}

module.exports = { createauthor,loginAuthor };
