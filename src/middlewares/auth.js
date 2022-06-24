const jwt = require("jsonwebtoken");
const blogsmodel = require("../models/blogsModel");
const mongoose = require("mongoose");

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token)return res.status(400).send({ status: false, msg: "Enter token in header" });
    
    let decodedToken = jwt.verify(token,"project1-AADI",function(err){
        if(err){
          return res.status(400).send({ status: false, msg: "Token is Invalid"});
        }else {
           next()
        }});
    console.log(decodedToken)

  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];

    //if (!token)return res.status(400).send({status: false, msg: "Enter token in header"});

    let decodedToken = jwt.verify(token, "project1-AADI");

    //if (!decodedToken)return res.status(404).send({status: false, msg: "Token not found"});

    let dataParams = req.params;
    let dataQuery = req.query;

    let findBlog = await blogsmodel.findOne({ _id: dataParams.blogId });
    if (findBlog) {
      if (decodedToken.authorId != findBlog.authorId)return res.status(403).send({ status: false, msg: "Author Not Authorized" });
      req.blogId = dataParams.blogId;
    }

    let authorBlog = await blogsmodel.find({$all:dataQuery}).select({ authorId: 1, _id: 0 });
    // console.log(dataQuery)
    // console.log(authorBlog)
    let idOfAuthor = authorBlog.map(function (element) {  
      return element.authorId.toString();
    });
    if (idOfAuthor.includes(decodedToken.authorId)) {
      req.authorId = decodedToken.authorId;
    } else return res.status(403).send({ status: false, msg: "Author is not Authorized" });

    next();

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { authentication, authorization };
