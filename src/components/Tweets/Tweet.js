import React, { Component } from 'react'

/* Components  */
import TweetInfo from './TweetInfo'

/* Store */
import TweetStore from '../../stores/TweetStore'

/* Actions */
import TweetActions from '../../actions/TweetActions'

export default class Tweet extends Component {
  constructor(props) {
    super(props)
    this.state = TweetStore.getState()
    this._onChange = this._onChange.bind(this)
    this.renderTweetContainer = this.renderTweetContainer.bind(this)
  }

  componentDidMount() {
    TweetStore.listen(this._onChange)

    TweetActions.fetchTweets()
  }

  componentWillUnmount() {
    TweetStore.unlisten(this._onChange)
  }

  _onChange(state) {
    this.setState(state)
  }

  renderTweetContainer(tweets) {
    const { styles } = this.props
    return tweets.map(tweet => (
        <div key={tweet.id}>
          <p>
          {tweet.user.name}
          <span className={styles.screenName}>
            @{tweet.user.screen_name}
          </span>
          </p>
          <img src={tweet.user.profile_image_url} />
          <TweetInfo {...tweet} styles={styles} />
        </div>
      )
    )
  }

  render() {
    const {
      errorMessage,
      tweets
    } = this.state

    if (errorMessage) {
      return (
        <div>Something is wrong</div>
      )
    }

    if (tweets.length === 0) {
      return (<div> loading... </div>)
    }
    /* Make Tweet Card component */
    return (
      <div>
        <div>tweets goes here</div>
        {this.renderTweetContainer(tweets)}
      </div>
    )
  }
}
