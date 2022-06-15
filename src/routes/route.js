const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController");
const userModel1 = require('../models/userModel1');
const userModel1Controller= require("../controllers/userModel1Controller");
const middleware = require("../middleware/auth")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userModel1Controller.createUser  )

router.post("/login", userModel1Controller.loginUser)

//The userId is sent by front end
router.get("/users/:userId",middleware.mid1,userModel1Controller.getUserData)

router.put("/users/:userId", userModel1Controller.updateUser)

router.delete("/users/:userId", userModel1Controller.deleteUser)


module.exports = router;