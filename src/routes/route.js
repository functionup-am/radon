const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
// const bookModel= require("../bookModel/bookModel")
// const bookController= require("../bookController/bookController")

const authorModel = require("../authorModel/authorModel")
const bookModel = require ("../BookModel1/bookModel")
const book_Controller =require("../book_Controller/bookController")

router.post("/createAuthor", book_Controller.createAuthor)

router.post("/createBook", book_Controller.createBook)

router.get("/getBooksChetanBhagat", book_Controller.getBooksChetanBhagat)

router.get("/authorOfBook", book_Controller.authorOfBook)

router.get("/bookBetween50_100", book_Controller.bookBetween50_100)





















// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

// router.post("/createBook", BookController.createBook  )

// router.get("/getBooksData", BookController.getBooksData)

// router.post("/createBook", bookController.createBookModel )

// router.post("/getBooksInYear", bookController.getBooksInYear )

// router.post("/getParticularBooks", bookController.getParticularBooks)

// router.get("/getXINRBooks", bookController.getXINRBooks )

// router.get("/getRandomBooks", bookController.getRandomBooks )

// router.get("/bookList", bookController.bookList)

module.exports = router;