const middleController = require("../controllers/middleController")

let api1 = async function (req,res) {
    res.send({ msg: "This is 1st Trial Basis API"})
}

let api2 = async function (req,res) {
    res.send({ msg: "This is 2nd Trial Basis API"})
}

let api3 = async function (req,res) {
    res.send({ msg: "This is 3rd Trial Basis API"})
}

let api4 = async function (req,res) {
    res.send({ msg: "This is 4th Trial Basis API"})
}

let api5 = async function (req,res) {
    res.send({ msg: "This is 5tt Trial Basis API"})
}

let api6 = async function (req,res) {
    res.send({ msg: "This is 6th Trial Basis API"})
}

module.exports.api1 = api1
module.exports.api2 = api2
module.exports.api3 = api3
module.exports.api4 = api4
module.exports.api5 = api5
module.exports.api6 = api6
