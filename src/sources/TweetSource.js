import tweets from '../../tweets.json'

var TweetSource = {
  fetch() {
    // imitate AJAX call — replace with axios later
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(tweets)
      }, 1500 )
    })
  }
}

export default TweetSource
