const express = require('express');
const myHelper = require('../util/helper')
let lodash = require("lodash");
const { result } = require('lodash');

const router = express.Router();

// router.get('/test-me', function (req, res) {
//     myHelper.printDate()
//     myHelper.getCurrentMonth()
//     myHelper.getCohortData()
//     let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
//     console.log('The first element received from underscope function is '+firstElement)
//     res.send('My first ever api!')
// });

// Create an array of strings containing the names all the months of a year and split the array into 4 equally sized sub-arrays using the chunk function. Print these sub-arrays
//  Create an array containing the first 10 odd numbers. Using the tail function, return the last 9 elements of it and print them on console.
// Create 5 arrays of numbers containing a few duplicate values. Using the function union create a merged array with only unique values and print them
// Use the function fromPairs to create an object containing key value pairs. For example [“horror”,”The Shining"],[“drama”,”Titanic"],[“thriller”,”Shutter Island"],[“fantasy”,”Pans Labyrinth"]


router.get('/hello', function (req, res) {
    let year = lodash.chunk(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 3)
    console.log(year)

    let num = lodash.tail([1, 3, 5, 7, 9, 11, 13, 15, 17, 19])
    console.log(num)

    let arr = lodash.union([1, 2,], [2, 2], [3, 4], [4, 5], [6, 7])
    console.log(arr)

    let pair = lodash.fromPairs([["horror", "The Shining"],["drama", "Titanic"],["thriller", "Shutter Island"],["fantasy", "Pans Labyrinth"]])
    console.log(pair)

    res.send('Lodash Fire!')
});

//Create an API for GET /movies that returns a list of movies. Define an array of movies in your code and return the value in response.
	
router.get('/movies', function (req,res){
    let movies = [["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]]
    res.send(movies);
});

//Create an API GET /movies/:indexNumber (For example GET /movies/1 is a valid request and it should return the movie in your array at index 1). You can define an array of movies again in your api 

router.get('/movies/:indexNumber', function (req,res){
let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
res.send(movies[req.params.indexNumber]);
});

//Handle a scenario in problem 2 where if the index is greater than the valid maximum value a message is returned that tells the user to use a valid index in an error message.
router.get('/movies/:indexNumber', function(req,res){
    let movies= ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    const input = req.params.indexNumber;
    const result = movies.find ((ele) =>ele.id == input);
    if (result === undefined){
        res.send("use a valid index number");
    }
    res.send(result);
});

//Write another api called GET /films. Instead of an array of strings define an array of movie objects this time. Each movie object should have values - id, name. An example of movies array is  
router.get('/films',function (req,res){
    let films = [
        {id: 1, name: "The shining"},
        {id: 2, name: "Incendies"},
        {id: 3, name: "Rang de Basanti"},
        {id: 4, name: "Finding Nemo"},
    ];
    res.send(films); 
});

//Write api GET /films/:filmId where filmId is the value received in request path params. Use this value to return a movie object with this id. In case there is no such movie present in the array, return a suitable message in the response body. Example for a request GET /films/3 should return the movie object 
 
router.get('/films/:filmId',function (req,res){
    let films = [
        {Id: 1, name: "The shining"},
        {Id: 2, name: "Incendies"},
        {Id: 3, name: "Rang de Basanti"},
        {Id: 4, name: "Finding Nemo"},
    ];

    const input = req.params.filmId;
    const result = films.find((ele) => ele.Id == input);
    if (result === undefined) {
        res.send("no movie exists with this id")
    }
    res.send(result); 
});


// // -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing
 app.get("/sol1", function (req, res) {
//     //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,5,6,7]
  
    let total = 0;
    for (var i in arr) {
        total += arr[i];
    }
  
    let lastDigit= arr.pop()
    let consecutiveSum= lastDigit * (lastDigit+1) / 2
    let missingNumber= consecutiveSum - total
  
    res.send(  { data: missingNumber  }  );
  });
  
    // -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33, 34, 35, 37, 38]: 36 is missing
  app.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr= [33, 34, 35, 37, 38]
    let len= arr.length
  
    let total = 0;
    for (var i in arr) {
        total += arr[i];
    }
  
    let firstDigit= arr[0]
    let lastDigit= arr.pop()
    let consecutiveSum= (len + 1) * (firstDigit+ lastDigit ) / 2
    let missingNumber= consecutiveSum - total
   
    res.send(  { data: missingNumber  }  );
 });
  
 
 



router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})


module.exports = router;
// // adding this comment for no reason
