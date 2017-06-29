import tweets from '../../tweets.json';
//import axios from 'axios'
//const API_ROOT = 'http://localhost:8080'

const TweetSource = {
  fetch(_screenName) {
    // imitate AJAX call — replace with axios later
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(tweets);
      }, 1500);
    });
    //return axios.get(`${API_ROOT}/api/tweets/${screenName}`)
  }
};

export default TweetSource;
