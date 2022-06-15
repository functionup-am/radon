const userModel1 = require('../models/userModel1')
const jwt = require('jsonwebtoken')
// Write a **POST api /users** to register a user from the user details in request body. 
let createUser = async function (req,res){
    let data = req.body
    let savedData = await userModel1.create(data)
    res.send({msg: savedData})
}

// Write a ***POST api /login** to login a user that takes user details - email and password from the request body. If the credentials don't match with any user's data return a suitable error.
const loginUser = async function (req, res) {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel1.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });
    let token = jwt.sign({
        userId: user._id.toString(),
        batch: "radon",
        organization: "FunctionUp"
    },"functionUp-radon");
    res.send({ msg: "done",token1:token })
    res.setHeader("x-auth-token", token);
res.send({ status: true, token1: token });
};

// Write a **GET api /users/:userId** to fetch user details. Pass the userId as path param in the url. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
// If present, check that the token is valid.

const getUserData = async function (req, res) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
  let decodedToken = jwt.verify(token, "functionUp-radon");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel1.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};

// Write a **PUT api /users/:userId** to update user details. Pass the userId as path param in the url and update the attributes received in the request body. Check that request must contain **x-auth-token** header. If absent, return a suitable error.

const updateUser = async function (req, res) {
    // Do the same steps here:
    // Check if the token is present
    // Check if the token present is a valid token
    // Return a different error message in both these cases
    
      let userId = req.params.userId;
      let user = await userModel1.findById(userId);
      //Return an error if no user with the given id exists in the db
      if (!user) {
        return res.send("No such user exists");
      }
    
      let userData = req.body;
      let updatedUser = await userModel1.findOneAndUpdate({ _id: userId }, userData);
      res.send({ status: updatedUser, data: updatedUser });
    };

    // Write a **DELETE api /users/:userId** that takes the userId in the path params and marks the isDeleted attribute for a user as true. Check that request must contain **x-auth-token** header. If absent, return a suitable error.

    const deleteUser = async function (req,res) {
        let userId = req.params.userId;
        let user = await userModel1.findById(userId);
        if (!user) {
            return res.send("No such user exists");
          }

          let userData = req.body;
          let deletedUser = await userModel1.findOneAndUpdate({ _id: userId }, userData);
          res.send({ status: deletedUser, data: deletedUser });
        };
    
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.getUserData = getUserData;
module.exports.loginUser = loginUser
module.exports.createUser = createUser