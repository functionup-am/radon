const express = require("express");
const router = express.Router();
const authorcontroller = require("../controllers/authorController");
const blogController = require("../controllers/blogsController");
const middleware= require('../middlewares/auth')

router.post("/authors", authorcontroller.createauthor);

router.post("/login",authorcontroller.loginAuthor);

router.post("/blogs", middleware.authentication,blogController.createBlogs);

router.get("/blogs", middleware.authentication,blogController.getBlogs);

router.put("/blogs/:blogId",middleware.authentication,middleware.authorization, blogController.putBlogs);

router.delete("/blogs/:blogId", middleware.authentication,middleware.authorization,blogController.deleteBlogs);

router.delete("/blogs", middleware.authentication,middleware.authorization,blogController.deleteBlogsByQuery);

module.exports = router;
