export default {
  appState: {
    TweetStore: {
      tweets: window.__appPreloadState.tweets
    },
    FriendStore: {
      friends: window.__appPreloadState.friends
    }
  }
};
