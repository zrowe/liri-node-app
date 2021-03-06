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

    banner(command, argument)

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
            console.log('Options are:\n\tmy-tweets\n\tspotify-this-song <"name of a song">\n\tmovie-this <"name of a movie">\n\tdo-what-it-says')
    }
}

// my-tweets
// Show my last 20 tweets and when they were created.
function myTweets() {

    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (error) throw error;
        log("\n");
        for (var i = 0; i < tweets.length; i++) {
            log("(" + tweets[i].created_at + ") " + tweets[i].text); // The favorites. 
        }
    });
}

// spotify-this-song '<song name here>'
// Show information about the song.
function spotifyThisSong(song) {

    spotify
        .search({ type: 'track', query: song, limit: 1 })

        .then(function(response) {
            if (!(Array.isArray(response.tracks.items) && response.tracks.items.length)) {
                log('Your song "' + song + '" was not found');
            } else {
                log(""); // for a blank line at start
                log(showArtists(response.tracks.items[0].album.artists));
                log("Song's Name: " + response.tracks.items[0].name);
                log("Preview Link: " + response.tracks.items[0].preview_url);
                log("Album Name: " + response.tracks.items[0].album.name);

                function showArtists(arr) {
                    var artists = "Artist(s): "
                    for (var i = 0; i < arr.length; i++) {
                        artists = artists + arr[i].name + ", ";
                    }
                    return artists.substr(0, artists.length - 2);
                }
            }
        })
        .catch(function(err) {
            log(err);
        });
}



// movie-this '<movie name here>'
// Output movie information to your terminal/bash window:
function movieThis(movie) {

    request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {

            var parsedBody = JSON.parse(body);
            if (parsedBody.Response === "True") {
                log("\nThe movie's title is: " + parsedBody.Title);
                log("It came out in: " + parsedBody.Year);
                log("IMDB rated it: " + parsedBody.imdbRating);
                log("Rotten Tomatoes rated it: " + searchRatings("Rotten Tomatoes", parsedBody.Ratings));
                log("It was produced in: " + parsedBody.Country);
                log("And the language is: " + parsedBody.Language);
                log("The actors: " + parsedBody.Actors);
                log("And here's the plot: " + parsedBody.Plot);

                function searchRatings(nameKey, myArray) {
                    for (var i = 0; i < myArray.length; i++) {
                        if (myArray[i].Source === nameKey) {
                            return myArray[i].Value;
                        }
                    }
                    return "Not Rated";
                }
            } else {
                if (parsedBody.Response === "False") {
                    log(parsedBody.Error);
                }
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


// Write command banner to log file
function banner(command, argument) {

    if (!(command === undefined)) {
        if (argument === undefined) { var argument = ""; }
        var message = "\n* * * * * * * * * * * * * * " + command + " " + argument + " * * * * * * * * * * * * * *";
        fs.appendFileSync("log.txt", message + "\n", "utf8");
    }
}


// Write to the log file as well as the console
function log(message) {
    console.log(message);
    fs.appendFileSync("log.txt", message + "\n", "utf8");
}


execute(command, argument)