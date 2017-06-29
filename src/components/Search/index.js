import React, { Component } from 'react';
//import { users as friends } from '../../../friends.json'

import FriendStore from '../../stores/FriendStore';
import FriendActions from '../../actions/FriendActions';
import TweetActions from '../../actions/TweetActions';
import styles from './styles.css';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      friendList: FriendStore.getState().friends,
      matches: FriendStore.getState().friends
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FriendStore.listen(this.onChange);
  }

  componentWillUnmount() {
    FriendStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      matches: state.friends
    });
  }

  handleTextChange(e) {
    const emptyTextField = value => value === '';
    const {
      friendList
    } = this.state;

    this.setState({
      text: e.target.value
    });

    if (emptyTextField(e.target.value)) {
      FriendActions.resetFriends();
      return;
    }

    FriendActions.filterFriends(e.target.value, friendList);
  }

  render() {
    const hasMatches = () => this.state.matches.length > 0;
    const SearchComponent = this;

    const resetSearchAndGetTweetsBy = user => (
      {
        injectContext(_) {
          return () => {
            TweetActions.fetchTweetsByUsername(user.screen_name);
            //context.state.text = '';
            FriendActions.resetFriends();
          };
        }
      }
    );

    /* Need to move to separate folder later  */
    const fetchTweetsBy = user =>
      resetSearchAndGetTweetsBy(user).injectContext(SearchComponent);

    const userAutocompleteDisplay = user =>
      (
        <button key={user.id} onClick={fetchTweetsBy(user)}>
          <img alt="profile-img" className={styles.userImage} src={user.profile_image_url} />
          <p className={styles.userName}> {user.name} </p>
        </button>
      );

    const renderMatchedResults = users =>
      users.map(user => userAutocompleteDisplay(user));

    return (
      <div className={styles.searchSection}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={this.handleTextChange}
            value={this.state.text}
          />
          <span className="input-group-btn">
            <button className="btn btn-secondary">Search</button>
          </span>
        </div>
        <div className={`${hasMatches() ? styles.showMatches : ''} ${styles.results}`}>
          {renderMatchedResults(this.state.matches)}
        </div>
      </div>
    );
  }
}
