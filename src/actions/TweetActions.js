import React from 'react'

import TweetSource from '../sources/TweetSource'
import alt from '../alt'

class TweetActions {
  fetchTweets() {
    return (dispatch) => {
      dispatch()
      TweetSource.fetch()
        .then(tweets => this.updateTweets(tweets))
        .catch(errorMessage => this.tweetsFailed(errorMessage))
    }
  }

  tweetsFailed(errorMessage) {
    return errorMessage
  }

  updateTweets(tweets) {
    return tweets
  }
}

export default alt.createActions(TweetActions)

