const blogsmodel = require("../models/blogsModel");
const authormodel = require("../models/authorModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// ### POST /blogs
// - Create a blog document from request body. Get authorId in request body only.
// - Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
// - Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like [this](#successful-response-structure)
// - Create atleast 5 blogs for each author
// - Return HTTP status 400 for an invalid request with a response body

const createBlogs = async function (req, res) {
  try {
    let data = req.body;
    //Checks whether Body is empty or not
    if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty" });
    // Checks if title is empty or entered as a string or contains valid Title
    if (!data.title)return res.status(400).send({ status: false, msg: "Please Enter Title" });
    if (typeof data.title !== "string")return res.status(400).send({ status: false, msg: " Please enter title as a String" });
    let validTitle =  /^\w[a-zA-Z0-9.]*$/
    data.title = data.title.trim();
    if (!validTitle.test(data.title)) return res.status(400).send({ status: false, msg: "The Title cannot be empty"})
  // Checks if Body is empty or entered as a string
    if (!data.body)return res.status(400).send({ status: false, msg: "Please Enter Body" });
    if (typeof data.body !== "string")return res.status(400).send({ status: false, msg: " Please enter body as a String" });
    data.body = data.body.trim();
    if (data.body.length ==0) return res.status(400).send({ status: false, msg: "The Body cannot be empty"})
    // Checks if category is empty or entered as a string or contains valid Category
    if (!data.category)return res.status(400).send({ status: false, msg: "Please Enter Category" });
    if (typeof data.category !== "string")return res.status(400).send({ status: false, msg: "Please enter Category as a String" });
    let validCategory =  /^\w[a-zA-Z0-9.]*$/
    data.category = data.category.trim();
    if (!validCategory.test(data.category)) return res.status(400).send({ status: false, msg: "The Category cannot be empty"})
    // Checks if authorId is empty or contains valid authorId
    let authorId = req.body.authorId;
    if (!authorId) return res.status(400).send({ status: false, msg: "Enter Author Id" });
    if(authorId.length !=24) return res.status(400).send({ status: false, msg: "Please Enter authorId as a valid objectId"});
    // Checks whether authorId is present in author collection or not
    let checkAuthorId = await authormodel.findById(authorId);
    if (!checkAuthorId)
      return res.status(404).send({ status: false, msg: "Entered author not found"});
    //If isPublished is true then adding timestamp
    if (data.isPublished) {
      if(typeof data.isPublished !== "boolean")return res.status(400).send({ status: false, msg: "Please mention isPublished as True or False" });
      if(data.isPublished== true){
      let date = Date.now();
      data.publishedAt = date;}
    }
    let save = await blogsmodel.create(data);
    res.status(201).send({ status: true, data: save });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};

// ## GET /blogs
// - Returns all blogs in the collection that aren't deleted and are published
// - Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure)
// - If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure)
// - Filter blogs list by applying filters. Query param can have any combination of below filters.
//   - By author Id
//   - By category
//   - List of blogs that have a specific tag
//   - List of blogs that have a specific subcategory

const getBlogs = async function (req, res) {
  try {
    let conditions = req.query;  
    //Checks if category is entered as a string or not  
    if (conditions.category){
      if(typeof conditions.category !== 'string') return res.status(400).send({ status: false, msg: "Please enter Category as a String" });}
    // Checks whether author id isa valid ObjectId
      if(conditions.authorId) {
        if ((conditions.authorId).length !=24)return res.status(400).send({ status: false, msg: "Please Enter authorID as a valid ObjectId" })}
        // Fetching the blogs
    let blogs = await blogsmodel.find({
      $and: [conditions, { isDeleted: false }, { isPublished: true }],
    });
    if (blogs.length == 0)return res.status(404).send({ status: false, msg: "No Blogs found" });

    res.status(200).send({ status: true, data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};

// ### PUT /blogs/:blogId
// - Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// - Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
// - Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
// - Return an  if updated successfully with a body like [this](#successful-response-structure)
// - Also make sure in the response you return the updated blog document.

const putBlogs = async function (req, res) {
  try {
    let blogId = req.blogId;
    //Checks whetther BlogId is present and is a valid ObjectId
    if(!blogId)return res.status(400).send({ status: false, msg: "Please enter BlogID" });
    if (blogId.length !=24)return res.status(400).send({ status: false, msg: "Please enter blogID as a valid ObjectId"});

    let blog = await blogsmodel.findById(blogId);
    if (!blog) {
      return res.status(404).send({ status: false, msg: "Blog Not Found" });
    }
    let blogData = req.body;
    //Checks whether title is a string or not 
    if (blogData.title){
      if(typeof blogData.title !== 'string') return res.status(400).send({ status: false, msg: " Please Enter Title as a String" });}
      //Checks whether body is a string or not 
    if (blogData.body){
      if(typeof blogData.body !== 'string') return res.status(400).send({ status: false, msg: " Please enter body as a String" });}
      //Updating the Blog
    let updatedBlog = await blogsmodel.findOneAndUpdate(
      { _id: blogId, isDeleted: false }, //Checks weather document is deleted or not { _id: blogId },
      {
        title: blogData.title,
        body: blogData.body,
        isPublished: true,
        publishedAt: Date.now(),
        $push: { tags: blogData.tags, subcategory: blogData.subcategory },
      },
      { new: true }
    );

    if(!updatedBlog) return res.status(404).send({status:false,msg:"No blogs found"})

    res.status(200).send({ status: true, data: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};

// ### DELETE /blogs/:blogId
// - Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
// - If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure)

const deleteBlogs = async function (req, res) {
  try {
    let blogId = req.blogId;
    //Checks whether BlogId is a valid ObjectId
    if (blogId.length !=24)return res.status(400).send({ status: false, msg: "Please enter blogID as a valid ObjectId"});
    //Deleting blog and adding timestamp
    let blog = await blogsmodel.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: Date.now() } },
      { new: true }
    );
    if (!blog) {
      return res.status(404).send({ status: false, msg: "Blog Not Found" });
    }
    res.status(200).send({ status: true, msg: "Document is deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};

// ### DELETE /blogs?queryParams
// - Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// - If the blog document doesn't exist then return an HTTP status of 404 with a body

const deleteBlogsByQuery = async function (req, res) {
  try {    
    let conditions = req.query;
    //Checks whether query params is empty or not
    if (Object.keys(conditions).length == 0)  return res.status(400).send({ status: false, msg: "Query Params cannot be empty" });
    let filters = {
      isDeleted:false
    }
    filters.authorId=req.authorId 
      if(conditions.authorId) {
        if ((conditions.authorId).length !=24) return res.status(400).send({ status: false, msg: "Please Enter authorID as valid ObjectId"});
        if(conditions.authorId != req.authorId) return res.status(400).send({ status: false, msg: "Author is not authorized"}) 
        filters.authorId=conditions.authorId       
      }
      if(conditions.category) {
        if(typeof conditions.category !== 'string')return res.status(400).send({ status: false, msg: "Please Enter Category as a String" });
        filters.category=conditions.category;
      }
      if(conditions.tags) filters.tags={$all:conditions.tags};
      if(conditions.subcategory) filters.subcategory={$all:conditions.subcategory};
      if(conditions.isPublished) filters.isPublished=false;

    console.log(filters)
     
    //let deleteBlogs = await blogsmodel.updateMany(filters,{ $set: { isDeleted: true, deletedAt: Date.now()}});   
    let deleteBlogs= await blogsmodel.updateMany({$and:[{isDeleted:true}]},{$set:{isDeleted:false,isPublished:true}})
    console.log(deleteBlogs);
    if (deleteBlogs.matchedCount == 0) {
      return res.status(404).send({ status: false, msg: "Blog Not Found" });
    }
    res.status(200).send({ status: true, msg: "Document is deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = {createBlogs, getBlogs, putBlogs, deleteBlogs, deleteBlogsByQuery}