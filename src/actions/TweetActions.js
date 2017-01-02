import React from 'react'

import TweetSource from '../sources/TweetSource'
import alt from '../alt'

class TweetActions {
  fetchTweets() {
    const callUpdateTweets = tweets => this.updateTweets(tweets)
    const handleRequestError = errorMessage = this.tweetsFailed(errorMessage)

    return (dispatch) => {
      dispatch()
      TweetSource.fetch()
        .then(callUpdateTweets)
        .catch(handleRequestError)
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

