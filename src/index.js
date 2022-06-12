const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
 const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// const mongoose = require ('mongoose')
//  Write a middleware that logs (console.log) some data everytime any API is hit
// Data to be logged:-the current timestamp(as date time) , the IP of the user and the route being requested).
// For this first figure out how to get the route location being requested, how to get current timestamp and how to get the IP.
// NOTE: ip of local computer will come as ::1 so dont get disturbed by seeing this)
// e.g: you should be logging something like this on each line:
// time , IP, Route should be printed on each line in terminal( every time an api is hit)
// 2010-08-19 14:00:00 , 123.459.898.734 , /createUser
// 2010-08-19 14:00:00 , 123.459.898.734 , /basicAPi
// 2010-08-19 14:00:00 , 123.459.898.734 , /falanaAPI


mongoose.connect("mongodb+srv://AkshayMakwana:Akshay123@cluster0.zmta9.mongodb.net/Akshay-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req,res,next) {
   var currentdate = new Date();
   console.log(currentdate + " " + req.ip + " " + req.path)
//    var datetime = currentdate.getDate() + " "
//                  + (currentdate.getMonth()+1)  + " "
//                  + currentdate.getFullYear()  + " "
//                  + currentdate.getHours()  + " "
//                  + currentdate.getMinutes()  + " "
//                  + currentdate.getSeconds();
//    let ip = req.ip
//    let url = req.originalUrl

//    console.log(`${datetime} ${ip} ${url}`)

   next();

   }
);

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
















// app.use (
//     function (req, res, next) {
//         console.log ("inside GLOBAL MW");
//         next();
//   }
//   );

// app.use('/', route);


