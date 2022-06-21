const blogsmodel = require("../models/blogsModel");
const authormodel = require("../models/authorModel");

const createBlogs = async function (req, res) {
  try {
    let data = req.body;

    if(!data.title)return res.status(400).send({status :false , msg:" Please Enter Title"})
    if(!data.body)return res.status(400).send({status :false , msg:" Please Enter Body"})
    if(!data.category)return res.status(400).send({status :false , msg:" Please Enter Category"})
    if(!data.authorId)return res.status(400).send({status :false , msg:" Please Enter Author ID"})
    
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Body cannot be empty" });
    let authorId = req.body.authorId;
    if (!authorId)
      return res.status(400).send({ status: false, msg: "Enter Author Id" });

    let checkAuthorId = await authormodel.findById(authorId);
   
    if (!checkAuthorId)
      return res.status(404).send({ status: false, msg: "Author Not Found" });
      if (data.isPublished == true) {
        let date = Date.now();
        data.publishedAt = date;
      }
    let save = await blogsmodel.create(data);
    res.status(201).send({ status: true, data: save });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const getBlogs = async function (req, res) {
  try {
    let conditions = req.query;
    console.log(conditions);
    let blogs = await blogsmodel.find({$and:[conditions,{isDeleted:false}]} );
    if (blogs.length == 0)
      return res.status(404).send({ status: false, msg: "No documents found" });
    res.status(200).send({ status: true, data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};

const putBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let blog = await blogsmodel.findById(blogId);
    if (!blog) {
      return res.status(404).send({ status: false, msg: "Blog Not Found" });
    }
    let blogData = req.body;
    let updatedBlog = await blogsmodel.findOneAndUpdate(
      { _id: blogId, isDeleted: false }, //Checks weather document is deleted or not { _id: blogId },
      {
        title: blogData.title,
        body: blogData.body,
        category: blogData.category,
        isPublished: true,
        publishedAt: Date.now(),
        $push: { tags: blogData.tags, subcategory: blogData.subcategory },
      },
      { new: true }
    );
    res.status(200).send({ status: true, data: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};

const deleteBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let blog = await blogsmodel.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt:Date.now() } },
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
const deleteBlogsByQuery= async function(req,res){
    try {
        let conditions = req.query;
       let deleteBlogs= await blogsmodel.updateMany({$and:[conditions,{isDeleted:false}]},{$set:{isDeleted:true,deletedAt:Date.now()}},{new:true})
       //let deleteBlogs= await blogsmodel.updateMany({$and:[conditions,{isDeleted:true}]},{$set:{isDeleted:false}},{new:true})
        if (deleteBlogs.matchedCount ==0) {
            return res.status(404).send({ status: false, msg: "Blog Not Found" });
        }

        res.status(200).send({ status: true, msg: "Document is deleted" });
        
      } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: error.message });
      }
}

module.exports = { createBlogs, getBlogs, putBlogs, deleteBlogs ,deleteBlogsByQuery};
