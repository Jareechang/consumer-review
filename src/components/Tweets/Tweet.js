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

    TweetActions.fetchTweetsByUsername()
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
        <div className={styles.tweetSection} key={tweet.id}>
          <div className={styles.userDisplay}>
            <img className={styles.userImage} src={tweet.user.profile_image_url} />
            <p className={styles.userName}>
              {tweet.user.name}
              <span className={styles.screenName}>
                @{tweet.user.screen_name}
              </span>
            </p>
          </div>
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
        {this.renderTweetContainer(tweets)}
      </div>
    )
  }
}
