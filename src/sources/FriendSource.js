import axios from 'axios';
import FriendActions from '../actions/FriendActions';
import { urls } from '../constants/APIroutes';

const FriendSource = {
  getFriendList: {
    remote(_state) {
      const friendListEndpoint = urls.TWITTER.FRIENDS.LIST;
      return axios.get(friendListEndpoint);
    },
    success: FriendActions.fetchFriendListSuccess,
    error: FriendActions.fetchFriendListFailure
  }
};

export default FriendSource;
