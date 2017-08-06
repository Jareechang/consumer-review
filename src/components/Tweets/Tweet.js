import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectToStores from 'alt-utils/lib/connectToStores';

import TweetInfo from './TweetInfo';
import TweetStore from '../../stores/TweetStore';
import TweetActions from '../../actions/TweetActions';

@connectToStores
class Tweet extends Component {
  constructor(props) {
    super(props);
    this.renderTweetContainer = this.renderTweetContainer.bind(this);
  }

  static propTypes = {
    tweetStore: PropTypes.object
  }

  static defaultProps = {
    tweetStore: {}
  }

  static getStores() {
    return [
      TweetStore
    ];
  }

  static getPropsFromStores() {
    return {
      tweetStore: TweetStore.getState()
    };
  }

  state = {};

  static propTypes = {
    styles: PropTypes.object.isRequired
  }

  componentWillMount() {
    TweetActions.fetchTweetsByUsername.defer('test');
  }

  renderTweetContainer = (tweets) => {
    const {
      styles
    } = this.props;
    return tweets.map(tweet => (
      <div className={styles.tweetSection} key={tweet.id}>
        <div className={styles.userDisplay}>
          <img alt="profile-img" className={styles.userImage} src={tweet.user.profile_image_url} />
          <p className={styles.userName}>
            {tweet.user.name}
            <span className={styles.screenName}>
              @{tweet.user.screen_name}
            </span>
          </p>
        </div>
        <TweetInfo
          {...tweet}
          styles={styles}
        />
      </div>
      )
    );
  }

  render() {
    const tweetStore = this.props.tweetStore;
    const tweets = tweetStore.tweets || [];
    const isErrorResponse = tweetStore.error;
    if (isErrorResponse) {
      return (
        <div>Something is wrong</div>
      );
    }

    if (!tweets) {
      return (<div> loading... </div>);
    }

    return (
      <div>
        {this.renderTweetContainer(tweets)}
      </div>
    );
  }
}

export default Tweet;
