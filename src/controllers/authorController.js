const authormodel = require("../models/authorModel");
const validator = require("validator");

// ### Author APIs /authors
// - Create an author - atleast 5 authors
// - Create a author document from request body.

const createauthor = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Body cannot be empty" });
    if (!data.fname)
      return res
        .status(400)
        .send({ status: false, msg: " Please Enter First Name" });
        if(typeof data.fname !== 'string') return res.status(400).send({ status: false, msg: " Please Enter String" });

    if (!data.lname)
      return res
        .status(400)
        .send({ status: false, msg: " Please Enter Last Name" });
        if(typeof data.lname !== 'string') return res.status(400).send({ status: false, msg: " Please Enter String" });
    if (!data.title)
      return res
        .status(400)
        .send({ status: false, msg: " Please Enter Title" });
    if(typeof data.fname !== 'string') return res.status(400).send({ status: false, msg: " Please Enter String" });
    if (!data.password)
      return res
        .status(400)
        .send({ status: false, msg: " Please Enter Password" });
    if(typeof data.fname !== 'string') return res.status(400).send({ status: false, msg: " Please Enter String" });
    if (!data.email)
      return res
        .status(400)
        .send({ status: false, msg: " Please Enter E-mail" });
        if(typeof data.email !== 'string') return res.status(400).send({ status: false, msg: " Please Enter String" });
    let email = data.email;
    if (!validator.isEmail(email))//true validator.isEmail(email)
      return res
        .status(400)
        .send({ status: false, msg: "Entered E-mail is Invalid" });
    let save = await authormodel.create(data);
    res.status(201).send({ status: true, data: save });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { createauthor };
