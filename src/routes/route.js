const express = require('express');
const router = express.Router();
let authorcontroller = require('../controllers/authorController');
const blogController = require('../controllers/blogsController')

router.post('/authors',authorcontroller.createauthor)
router.post('/blogs',blogController.createBlogs)

module.exports = router;