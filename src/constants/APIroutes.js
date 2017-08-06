const isDevelopment = process.env.NODE_ENV === 'development';
export const API_ROOT = isDevelopment ? '/' : '/prod-url-goes-here';

export const urls = {
  TWITTER: {
    FRIENDS: {
      LIST: `${API_ROOT}api/twitter/friend-list`
    },
    TWEETS: {
      BY_NAME: `${API_ROOT}api/twitter/tweets`
    }
  }
};
