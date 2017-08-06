import Immutable from 'seamless-immutable';
import { datasource } from 'alt-utils/lib/decorators';

import FriendActions from '../actions/FriendActions';
import FriendSource from '../sources/FriendSource';
import alt from '../alt';

@datasource(FriendSource)
class FriendStore {
  constructor() {
    this.bindActions(FriendActions);
    this.state = Immutable({
      friendList: []
    });
  }

  fetchFriendList() {
    this.getInstance().getFriendList();
    this.setState(this.state.merge({
      loading: true
    }));
  }

  onFetchFriendListSuccess(res) {
    if (!res) return;
    if (!res.data) return;
    const responseData = res.data;
    this.setState(this.state.merge({
      loading: false,
      friendList: responseData
    }));
  }

  onFetchFriendListFailure(err) {
    if (!err) return;
    this.setState(this.state.merge({
      loading: false
    }));
  }
}

export default alt.createStore(FriendStore, 'FriendStore');
