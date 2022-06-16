const jwt = require("jsonwebtoken");

const authentication1 = function ( req, res, next) {

 if(!req.headers["x-auth-token"]) return res.send({ status: false, msg: "token must be present" })


 let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");
  console.log(decodedToken)
 
  if(!(decodedToken.batch=="Radon"))                         
    return res.send({ status: false, msg: "token is invalid" });
 
 next()
}

module.exports.authentication1 = authentication1   

const authorisation1= function ( req, res, next) {
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");

    if(!(decodedToken.userId==req.params.userId))                          
    return res.send({ status: false, msg: "you are logged but you are not authorise to change other's data" });
 

    next()
   }
   
   module.exports.authorisation1= authorisation1