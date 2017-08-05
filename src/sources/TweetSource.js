//import tweets from '../../tweets.json';
import axios from 'axios';
import TweetActions from '../actions/TweetActions';
import { urls } from '../constants/APIroutes';

const TweetSource = {
  getTweetsByUsername: {
    remote(state, screenName) {
      const tweetsEndpoint = urls.TWITTER.TWEETS.BY_NAME;
      return axios.get(tweetsEndpoint, {
        params: {
          name: screenName
        }
      });
    },
    success: TweetActions.fetchTweetsByUsernameSuccess,
    error: TweetActions.fetchTweetsByUsernameFailure
  }
};

export default TweetSource;
