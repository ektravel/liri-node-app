var fs = require("fs");
var request = require("request");
require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var userInput = process.argv[3];
var userCommand = process.argv[2];
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//liri.js commands:
switch (userCommand) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;

  case "help":
    help();
}

function help() {
  console.log("\nStart by typing 'node liri.js' followed by one of the following commands: " +
    "\n1. my-tweets" + "\n2. spotify-this-song" + "\n3. movie-this" + "\n4. do-what-it-says" +
    "\nNote: any movie or song name that consists of more than one word must be in quotation marks.");
};

//=========================================

function myTweets() {
  var params = process.argv[3];
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

function spotifyThisSong() {
  var songName = process.argv[3];
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
        // console.log(firstItem.artists.name);
        console.log("Artist: " + firstItem.artists[0].name);
        console.log("\nSong: " + firstItem.name);
        console.log("\nPreview URL: " + firstItem.preview_url);
        console.log("\nAlbum: " + firstItem.album.name);
      }
    }
  });
};

//==========================================

function movieInfo(body1) {
  console.log("Title: " + JSON.parse(body1).Title);
  console.log("Year the movie came out: " + JSON.parse(body1).Year);
  console.log("IMDB Rating: " + JSON.parse(body1).imdbRating);
  console.log("Rotten Tomatoes Rating: " + JSON.parse(body1).Ratings[1].Value);
  console.log("Country: " + JSON.parse(body1).Country);
  console.log("Language: " + JSON.parse(body1).Language);
  console.log("Plot: " + JSON.parse(body1).Plot);
  console.log("Actors: " + JSON.parse(body1).Actors);
};
function movieThis() {
  if (!userInput) {
    userInput = "mr.nobody";
  };
  var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  // console.log(queryURL);

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
// do-what-it-says

function doWhatItSays(){
fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    return console.log(error);
  }
  var dataArr = data.split(",");
  console.log("$ node liri.js " + dataArr[0] + " " + dataArr[1]);
});
};

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.


//===============================================

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.

// Make sure you append each command you run to the log.txt file.

// Do not overwrite your file each time you run a command.
