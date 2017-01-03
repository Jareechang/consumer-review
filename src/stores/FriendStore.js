import FriendActions from '../actions/FriendActions';
import alt from '../alt'

class FriendStore {
  constructor() {
    this.friends = []
    this.bindListeners({
      handleUpdateFriends: FriendActions.UPDATE_FRIENDS
    })
  }

  handleUpdateFriends(friends) {
    this.friends = friends
  }
}

export default alt.createStore(FriendStore, 'FriendStore')
