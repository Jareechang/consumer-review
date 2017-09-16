import sum from '../sum';
import FriendStore from '../stores/FriendStore';
import alt from '../alt';

/* example of using Async */
function slowApi() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('api response');
    }, 1000);
  })
}

describe('Friend store', () => {
  it('should bootstrap correctly', async () => {
    alt.bootstrap(JSON.stringify({
      FriendStore: {
        friendList: [{
          name: 'Jerry',
          location: 'bc'
        }]
      }
    }));
    const response = await slowApi();
    const friendStoreState = FriendStore.getState();
    const firstFriend = friendStoreState.friendList[0];
    expect(friendStoreState.friendList.length).toBe(1)
    expect(firstFriend.name).toBe('Jerry');
    expect(firstFriend.location).toBe('bc');
  });
});
