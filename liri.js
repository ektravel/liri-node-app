var fs = require("fs");
var request = require("request");
require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var userInputVar = process.argv[3];
var userCommandVar = process.argv[2];
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


function processCommands(userCommand, userInput) {
  switch (userCommand) {
    case "my-tweets":
      myTweets(userInput);
      break;

    case "spotify-this-song":
      spotifyThisSong(userInput);
      break;

    case "movie-this":
      movieThis(userInput);
      break;

    case "do-what-it-says":
      doWhatItSays();
      break;

    case "help":
      help();
      break;
  }
};

processCommands(userCommandVar, userInputVar);

function help() {
  console.log("\nStart by typing 'node liri.js' followed by one of the following commands: " +
    "\n1. my-tweets" + "\n2. spotify-this-song" + "\n3. movie-this" + "\n4. do-what-it-says" +
    "\nNote: any movie or song name that consists of more than one word must be in quotation marks.");
};

//=========================================

function myTweets(params) {
  if (!params) {
    params = { screen_name: "bootcamp_ut" };
  };

  client.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (!error) {
      for (i = 0; i < tweets.length; i++) {
        console.log("\nI wrote: " + tweets[i].text + "." + "\nThis tweet was written on: " + tweets[i].created_at + ".");
      }
    }
  });
};

//==========================================

function spotifyThisSong(songName) {
  if (!songName) {
    songName = "the sign artist:ace of base";
  }
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
      var firstItem = data.tracks.items[0];
      if (firstItem) {
        console.log("\nArtist: " + firstItem.artists[0].name);
        console.log("\nSong: " + firstItem.name);
        console.log("\nPreview URL: " + firstItem.preview_url);
        console.log("\nAlbum: " + firstItem.album.name);
      }
    }
  });
};

//==========================================

function movieInfo(body1) {
  console.log("\nTitle: " + JSON.parse(body1).Title);
  console.log("Year the movie came out: " + JSON.parse(body1).Year);
  console.log("IMDB Rating: " + JSON.parse(body1).imdbRating);
  console.log("Rotten Tomatoes Rating: " + JSON.parse(body1).Ratings[1].Value);
  console.log("Country: " + JSON.parse(body1).Country);
  console.log("Language: " + JSON.parse(body1).Language);
  console.log("Plot: " + JSON.parse(body1).Plot);
  console.log("Actors: " + JSON.parse(body1).Actors);
};
function movieThis(movieName) {
  if (!movieName) {
    movieName = "mr.nobody";
  };
  var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryURL, function (error, response, body) {
    if (error) {
      return console.log("error: ", error); // Print the error if one occurred 
    }
    // If the request was successful
    else if (!error && response.statusCode === 200) {
      movieInfo(body);
    }
  });
};

//===============================================

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    processCommands(dataArr[0], dataArr[1]);
  });
};

//===============================================