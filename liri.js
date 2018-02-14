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

    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (error) throw error;
        console.log("\n");
        for (var i = 0; i < tweets.length; i++) {
            console.log("(" + tweets[i].created_at + ") " + tweets[i].text); // The favorites. 
        }
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
        .search({ type: 'track', query: song, limit: 1 })
        .then(function(response) {
            console.log("\n");
            console.log(showArtists(response.tracks.items[0].album.artists));
            console.log("Song's Name: " + response.tracks.items[0].name);
            console.log("Preview Link: " + response.tracks.items[0].preview_url);
            console.log("Album Name: " + response.tracks.items[0].album.name);

            function showArtists(arr) {
                var artists = "Artist(s): "
                for (var i = 0; i < arr.length; i++) {
                    artists = artists + arr[i].name + ", ";
                }
                return artists.substr(0, artists.length-2);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}


// movie-this '<movie name here>'
// Output movie information to your terminal/bash window:
function movieThis(movie) {

    request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("\nThe movie's title is: " + JSON.parse(body).Title);
            console.log("It came out in: " + JSON.parse(body).Year);
            console.log("IMDB rated it: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rated it: " + searchRatings("Rotten Tomatoes", JSON.parse(body).Ratings));
            console.log("It was produced in: " + JSON.parse(body).Country);
            console.log("And the language is: " + JSON.parse(body).Language);
            console.log("The actors: " + JSON.parse(body).Actors);
            console.log("And here's the plot: " + JSON.parse(body).Plot);

            function searchRatings(nameKey, myArray) {
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
// Take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        } else {
            var arr = data.split(",");
            execute(arr[0], arr[1]);
        }
    });
}

execute(command, argument)