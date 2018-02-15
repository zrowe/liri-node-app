# liri-node-app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and returns data.

## Getting Started

To use, just clone down the repo, add your keys, and have fun.

### Prerequisites

LIRI BOT was built and tested with the following nodeJS NPM packages:

| NPM Package     | Version |
| --------------- | ------- |
| dotenv          | 5.0.0   |
| node-spotify-api| 1.0.7   |
| request         | 2.83.0  |
| twitter         |1.7.1    |


You will need access tokens for Twitter, OMDB, and Spotify

To obtain Spotify ID and Secret, goto [My Apps](https://beta.developer.spotify.com/dashboard/applications). (You will need to log into Spotify first.

To obtain Twitter keys and secrets, goto [Create an Application](https://apps.twitter.com/app/new).


### Installing

1. Clone the repo to your system.

1. Run `npm install`

1. Create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes):

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

```


### Usage

Usage is `node liri.js <command> <optional argument>`

```
$ node liri.js
Options are:
        my-tweets
        spotify-this-song <"name of a song">
        movie-this <"name of a movie">
        do-what-it-says
```

* **myTweets** displays the user's last 20 tweets
* **spotify-this-song** displays details from spotify's database of the song entered
* **movie-this** displays details from OMDB of the movie entered
* **do-what-it-says** reads from a command file (random.txt) instead of the command line.  

Actions and results are logged to a file named `log.txt`.  It can be deleted if need be for pruning.

## Authors

* **Paul Rowe** - *Initial work* - [zrowe](https://github.com/zrowe)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* UC Berkeley Coding BootCamp
* Trilogy
