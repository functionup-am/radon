const express = require('express');
const router = express.Router();

const newAuthorController= require("../controllers1/newAuthorController")
const newBookController= require("../controllers1/newBookController")
const newPublisherController= require("../controllers1/newPublisherController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", newAuthorController.createAuthor  )

router.post("/createBook", newBookController.createBook  )
router.get("/getBooksData",newBookController.getBooksData)
router.get("/getBooksWithAuthorDetails", newBookController.getBooksWithAuthorDetails)
router.get("/getBooks1Data",newBookController.getBooks1Data)
router.get("/getBooks2Data",newBookController.getBooks2Data)
router.get("/getBooks3Data",newBookController.getBooks3Data)
router.post("/createPublisher", newPublisherController.createPublisher)



module.exports = router;