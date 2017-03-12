const Twit = require('twit')
const fs = require('fs')

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60*1000
})

const log = (text) => {
  return _  => (
    console.log(text)
  )
}

const handleAction = (action) => {
  return (err) => {
    if (err) {
      console.log(err)
    }
    action()
  }
}

const tweetsFile = './tweets.json'

const saveTweetsToFile = function(err, data, response) {
  fs.writeFile(tweetsFile, JSON.stringify(data),
    handleAction(
      log('data saved to json file: ' + tweetsFile)
    )
  )
}

const readTweetFromFile = function() {
  fs.readFile(tweetsFile, 'utf-8', function(err, data) {
    if (err) {
      console.log(err)
    } else if (!data) {
      T.get('statuses/user_timeline', { screen_name: 'addyosmani', count: 10, tweet_mode: 'extended' }, saveTweetsToFile)
    }
  })
}

exports.getTweetsByUsername = function(name) {
  return T.get('statuses/user_timeline',
      {
        screen_name: name,
        count: 10,
        tweet_mode: 'extended'
      }
  )
}

//T.get('/friends/list', {}, (err, data ,response) => {
  //fs.writeFile('./friends.json', JSON.stringify(data),
    //handleAction(log('saving friends list to friends.json'))
  //)
//})

//readTweetFromFile();
