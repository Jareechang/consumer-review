import TweetActions from '../actions/TweetActions';
import alt from '../alt'

class TweetStore {
  constructor() {
    this.tweets = []
    this.bindListeners({
      handleUpdateTweets: TweetActions.UPDATE_TWEETS,
      handleFetchTweets: TweetActions.FETCH_TWEETS,
      handleTweetsFailed: TweetActions.TWEETS_FAILED
    })
  }

  handleFetchTweets(tweets) {
    this.tweets = [] // reset tweets
  }

  handleTweetsFailed(errorMessage) {
    this.errorMessage = errorMessage
  }

  handleUpdateTweets(tweets) {
    this.tweets = tweets
  }
}

export default alt.createStore(TweetStore, 'TweetStore')