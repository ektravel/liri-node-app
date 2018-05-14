require("dotenv").config();

var keys = require("./keys");

var spotifyId = keys.spotify.id;

console.log("id: " + spotifyId);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Make it so liri.js can take in one of the following commands:

// my-tweets : show your last 20 tweets and when they were created at in your terminal/bash window
//==========================================

// use node-spotify-api package in order to retrieve song information from the Spotify API.
// spotify-this-song : '<song name here>' 
//This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.
//==========================================

//movie-this '<movie name here>'
var nodeArgs = process.argv;
var movieNameArr = nodeArgs.slice(2);

//Log required movie information
function movieInfo(){
    console.log("Title: "+ JSON.parse(body).Title);
    console.log("Year the movie came out: "+ JSON.parse(body).Year);
    console.log("IMDB Rating: "+ JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: "+ JSON.parse(body).Ratings[1].Value);
    console.log("Country: "+ JSON.parse(body).Country);
    console.log("Language: "+ JSON.parse(body).Language);
    console.log("Plot: "+ JSON.parse(body).Plot);
    console.log("Actors: "+ JSON.parse(body).Actors);
}
// Grab or assemble the movie name and store it in a variable called "movieName"
var movieName = movieNameArr.join("%20");
// Run a request to the OMDB API with the movie specified
var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryURL);

// Create a request to the queryUrl
  request(queryURL, function(error, response, body) {
    if(error){
        console.log("error: ", error); // Print the error if one occurred 
      }
     // If the request was successful
    else if (!error && response.statusCode === 200) {
        movieInfo();
    }
     //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'  
    else if (movieName === null){
        queryURL = "http://http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";
        movieInfo();  
    }
  });


//You'll use the request package to retrieve data from the OMDB API. API key = trilogy.

//===============================================
// do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

// Feel free to change the text in that document to test out the feature for other commands.

//===============================================

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.

// Make sure you append each command you run to the log.txt file.

// Do not overwrite your file each time you run a command.
