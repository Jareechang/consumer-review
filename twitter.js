const Twit = require('twit');
const fs = require('fs');

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60*1000
})

const tweetsFile = './tweets.json';

const saveTweetsToFile = function(err, data, response) {
  fs.writeFile('./tweets.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
    console.log('very nice, how mach! tweets saved');
  })
}

saveTweetsToFile()

const readTweetFromFile = function() {
  fs.readFile(tweetsFile, 'utf-8', function(err, data) {
    if (err) {
      T.get('statuses/user_timeline', { screen_name: 'addyosmani', count: 10 }, saveTweetsToFile);
      console.log(err);
    }
    console.log(data);
    console.log('getting tweets from FS');
  })
}

readTweetFromFile();
