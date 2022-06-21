const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://IndrashishRoy:windows10@radon-cohort-cluster.gtmdsvp.mongodb.net/groupAADI-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


// const deletebyquery = async function (req, res) { 
//     try { 
//         let data = req.query; //catched data 
//     if (Object.keys(data).length == 0) { //-> if data undefined 
//     return res.status(400).send({ status: false, msg: "MUST BE ANY QUERY" })}; 
//     let findblog = await BlogModel.find(data)
//     if (findblog.length == 0) return res.send({ status: false, msg: "NO CRITERIA MATCHES" }); 
//     let allblog = await BlogModel.updateMany( { isDeleted: true, deletedAt: Date.now() } ); 
//     if (allblog.modifiedCount == 0) { return res.status(400).send({ status: false, msg: "ALREADY DELETED" }); } 
//     else res.status(200).send({ status: true, data: `${allblog.modifiedCount}-DELETED` }); 
// } 
//     catch (err) { res.status(500).send({ msg: err.message }); } }; 