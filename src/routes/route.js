const express = require("express");
const router = express.Router();
const authorcontroller = require("../controllers/authorController");
const blogController = require("../controllers/blogsController");

router.post("/authors", authorcontroller.createauthor);
router.post("/blogs", blogController.createBlogs);

router.get("/blogs", blogController.getBlogs);

router.put("/blogs/:blogId", blogController.putBlogs);

router.delete("/blogs/:blogId", blogController.deleteBlogs);

router.delete("/blogs", blogController.deleteBlogsByQuery);

module.exports = router;
