
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