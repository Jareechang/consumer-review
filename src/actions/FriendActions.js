import alt from '../alt'

/* JSON source*/
import { users as friends } from '../../friends.json'

class FriendActions {

  fetchFriends() {
    return (dispatch) => {
      dispatch()
      setTimeout(() => {
        this.updateFriends(friends)
      }, 1000)
    }
  }

  filterFriends(text) {
    this.updateFriends(friends.filter(
      friend => friend.name.match(new RegExp(text, 'i'))
    ))
  }

  resetFriends() {
    this.updateFriends([])
  }

  updateFriends(friends) {
    return friends
  }
}

export default alt.createActions(FriendActions)

