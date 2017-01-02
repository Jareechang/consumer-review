const Twit = require('twit')
const fs = require('fs')

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60*1000
})

const handleAction = (action) => {
  return (err) => {
    if (err) {
      console.log(err)
    }
    actions()
  }
}

const tweetsFile = './tweets.json'

const saveTweetsToFile = function(err, data, response) {
  fs.writeFile(tweetsFile, JSON.stringify(data),
    handleAction(console.log('data saved to json file: ' + tweetsFile))
  )
}

const readTweetFromFile = function() {
  fs.readFile(tweetsFile, 'utf-8', function(err, data) {
    if (err) {
      console.log(err)
    } else if (!data) {
      T.get('statuses/user_timeline', { screen_name: 'addyosmani', count: 10 }, saveTweetsToFile)
    }
    console.log('getting tweets from FS')
  })
}

readTweetFromFile();
