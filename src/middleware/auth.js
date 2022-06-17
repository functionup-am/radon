const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const authentication1 = async function ( req, res, next) {

//  if(!req.headers["x-auth-token"]) return res.send({ status: false, msg: "token must be present" })

  try{
  
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(400).send({ status: false, msg: "No such user exists" });
               



 let token = req.headers["x-auth-token"];
 if(!token) return res.status(400).send({status: true , msg: "Token Must Be Present"});

     let decodedToken = jwt.verify(token, "functionup-radon");
   console.log(decodedToken)            
//   if(!(decodedToken.batch=="Radon"))               
 } catch(err){
  res.status(500).send({status: false , msg: "Token is invalid now", err: err.message});
  }    next();    
}
module.exports.authentication1 = authentication1           

const authorisation1= async function ( req, res, next) {

  
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");
    try{
    if((!decodedToken.userId==req.params.userId))                          
    return res.send({ status: false, msg: "you are logged but you are not authorise to change other's data" });
 
       
    next()
   }catch(error){
    res.status(500).send({msg:"SERVER ERROR", msg: error.message })
   }
}
   module.exports.authorisation1= authorisation1