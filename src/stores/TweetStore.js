import { datasource } from 'alt-utils/lib/decorators';
import Immutable from 'seamless-immutable';
import alt from '../alt';
import TweetActions from '../actions/TweetActions';
import TweetSource from '../sources/TweetSource';

@datasource(TweetSource)
class TweetStore {
  constructor() {
    this.state = Immutable({
      tweets: []
    });

    this.bindActions(TweetActions);
  }

  onFetchTweetsByUsername(name) {
    this.getInstance().getTweetsByUsername(name);
  }

  onFetchTweetsByUsernameSuccess(res) {
    if (!res) return;
    if (!res.data) return;
    const responseData = res.data;
    this.setState(this.state.merge({
      loading: false,
      tweets: responseData
    }));
  }

  onFetchTweetsByUsernameFailure(err) {
    if (!err) return;
    this.setState(this.state.merge({
      loading: false,
      error: true
    }));
  }
}

export default alt.createStore(TweetStore, 'TweetStore');
