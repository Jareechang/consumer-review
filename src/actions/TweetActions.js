import TweetSource from '../sources/TweetSource'
import alt from '../alt'

class TweetActions {
  fetchTweetsByUsername(screenName = '') {
    return (dispatch) => {
      dispatch()
      TweetSource.fetch(screenName)
        .then(tweets => this.updateTweets(tweets))
        .catch(errorMessage => this.tweetsFailed(errorMessage))
    }
  }

  tweetsFailed(errorMessage) {
    return errorMessage
  }

  updateTweets(tweets) {
    console.log('updating tweets');
    return tweets
  }
}

export default alt.createActions(TweetActions)

