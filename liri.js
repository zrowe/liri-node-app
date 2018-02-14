require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var argument = process.argv[3];

function execute(command, argument) {
    switch (command) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            if (argument) {
                var song = argument;
            } else {
                var song = "The Sign"
            }
            spotifyThisSong(song)
            break;
        case "movie-this":
            if (argument) {
                var movie = argument;
            } else {
                var movie = "Mr. Nobody"
            }
            movieThis(movie)
            break;
        case "do-what-it-says":
            doWhatItSays()
            break;
        default:
            console.log("no such command, options are:\n\t`my-tweets`\n\t`spotify-this-song`\n\t`movie-this`\n\t`do-what-it-says`")
    }
}


// my-tweets
// Show my last 20 tweets and when they were created.
function myTweets() {


    client.get('statuses/mentions_timeline', function(error, tweets, response) {
        if (error) throw error;
        console.log(tweets); // The favorites. 
        // console.log(response); // Raw response object. 
    });

}


// spotify-this-song '<song name here>'
// Show information about the song.
function spotifyThisSong(song) {

    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from
    spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.log(err);
        });
}


// movie-this '<movie name here>'
// Output movie information to your terminal/bash window:
function movieThis(movie) {

    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("\nThe movie's title is: " + JSON.parse(body).Title);
            console.log("It came out in: " + JSON.parse(body).Year);
            console.log("IMDB rated it: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rated it: " + search("Rotten Tomatoes", JSON.parse(body).Ratings));
            console.log("It was produced in: " + JSON.parse(body).Country);
            console.log("And the language is: " + JSON.parse(body).Language);
            console.log("The actors: " + JSON.parse(body).Actors);
            console.log("And here's the plot: " + JSON.parse(body).Plot);


            function search(nameKey, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].Source === nameKey) {
                        return myArray[i].Value;
                    }
                }
                return "Not Rated";
            }
        }
    });
}


// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays() {
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Feel free to change the text in that document to test out the feature for other commands.

    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        } else {
            var arr = data.split(",");
            execute(arr[0], arr[1]);
        }
    });
}

execute(command, argument)