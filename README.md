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

```
You will need access tokens for Twitter, OMDB, and Spotify
```

### Installing


1. Clone the repo to your system.

1. run npm install

1. create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes):

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


End with an example of getting some data out of the system or using it for a little demo


## Authors

* **Paul Rowe** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* UC Berkeley Coding BootCamp
* Trilogy

