const blogsmodel = require('../models/blogsModel')


let createBlogs = async function (req, res) {
    try {
        let data = req.body  

        let save = await blogsmodel.create(data)
        res.status(201).send({ status:true,data: save })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}





module.exports = { createBlogs }
