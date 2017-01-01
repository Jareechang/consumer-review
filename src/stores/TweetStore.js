import TweetActions from '../actions/TweetActions';
import alt from '../alt'

class TweetStore {
  constructor() {
    this.tweets = [];
    this.bindListeners({
      handleUpdateTweets: TweetActions.UPDATE_TWEETS
    })
  }
  handleUpdateTweets(tweets) {
    this.tweets = tweets;
  }
}

export default alt.createStore(TweetStore, 'TweetStore')
