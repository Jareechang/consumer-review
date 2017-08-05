import { datasource } from 'alt-utils/lib/decorators';
import alt from '../alt';
import TweetActions from '../actions/TweetActions';
import TweetSource from '../sources/TweetSource';

@datasource(TweetSource)
class TweetStore {
  constructor() {
    this.tweets = [];

    this.state = {

    };

    this.bindActions(TweetActions);
  }

  onFetchTweetsByUsername(name) {
    this.getInstance().getTweetsByUsername(name);
  }

  onFetchTweetsByUsernameSuccess(res) {
    if (!res) return;
    if (!res.data) return;
    const responseData = res.data;
    this.setState({
      loading: false,
      tweets: responseData
    });
  }

  onFetchTweetsByUsernameFailure(err) {
    if (!err) return;
    this.setState({
      loading: false
    });
  }
}

export default alt.createStore(TweetStore, 'TweetStore');
