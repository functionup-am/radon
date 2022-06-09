// const newAuthorModel = require("../newModels/newAuthorModel")
// const newBookModel = require("../newModels/newBookModel")
    const newPublisherModel = require("../newModels/newPublisherModel")
// 2. Write a POST api that creates a publisher from the details in the request body

const createPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await newPublisherModel.create(publisher)
    res.send({data: publisherCreated})
}

// const getPublishersData= async function (req, res) {
//     let publisher = await newPublisher.find()
//     res.send({data: publisher})
// }

module.exports.createPublisher= createPublisher
// module.exports.getPublishersData= getPublishersData