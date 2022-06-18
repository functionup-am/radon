const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const weatherController= require("../controllers/weatherController")
const axiomController = require("../controllers/axiomController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getDistrictsById", CowinController.getDistrictsById)
router.get("/cowin/getByPin", CowinController.getByPin)
router.get("/weather", weatherController.getWeather)
router.get("/weatherTemp", weatherController.getWeatherTemp)
router.get("/getSortCities", weatherController.getSortCities)
router.get("/allMeme", axiomController.allMeme)
router.post("/pickMemeId", axiomController.pickMemeId)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;