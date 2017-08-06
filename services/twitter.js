const Twit = require('twit')
const fs = require('fs')
const path = require('path');

const tweetsFile = './tweets.json';
const friendsListFile = './friends.json';

const TwitterAPI = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60*1000
});

const log = (text) => {
  console.log(`[LOG]: ${text}`);
};

const addLog = (text) => {
  return _  => log(text)
};

const handleError = (action) => {
  return (err) => {
    if (err) {
      console.log(err)
    }
    action()
  }
};

const saveTweetsToFile = function(err, data, response) {
  fs.writeFile(tweetsFile, JSON.stringify(data),
    handleError(
      addLog('data saved to json file: ' + tweetsFile)
    )
  );
};

function readDataFromFS(filePath) {
  const type = 'utf-8';
  return new Promise((resolve, reject) => {
     fs.readFile(filePath, type, function(err, data) {
       if (err) {
         reject(err);
       }
       resolve(JSON.parse(data));
     });
  });
};

exports.getTweetsByUsername = function(name) {
  const tweetsFilepath = path.join(__dirname, tweetsFile);
  try {
    log('Reading tweets from FS');
    return readDataFromFS(tweetsFilepath);
  } catch(e) {
    log('Error occured reading tweets from FS');
  }
  return TwitterAPI.get('statuses/user_timeline', {
    screen_name: name,
    count: 10,
    tweet_mode: 'extended'
  })
};

exports.getFriendsList = function() {
  const friendsListFilepath = path.join(__dirname, friendsListFile);
  try {
    log('Reading friends list from FS');
    return readDataFromFS(friendsListFilepath);
  } catch(e) {
    log('Error occured reading list from FS');
  }
  return TwitterAPI.get('/friends/list', {});
};
