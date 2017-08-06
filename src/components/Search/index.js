import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import PropTypes from 'prop-types';

import FriendStore from '../../stores/FriendStore';
import FriendActions from '../../actions/FriendActions';
import TweetActions from '../../actions/TweetActions';
import styles from './styles.css';

@connectToStores
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      friendList: [],
      matches: []
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  static propTypes = {
    friendStore: PropTypes.object
  };

  static defaultProps = {
    friendStore: {}
  };

  static getStores() {
    return [
      FriendStore
    ];
  }

  static getPropsFromStores() {
    return {
      friendStore: FriendStore.getState()
    };
  }

  componentWillMount() {
    FriendActions.fetchFriendList.defer();
  }

  emptyTextField = value => value === '';

  handleTextChange(e) {
    const {
      friendList
    } = this.state;

    this.setState({
      text: e.target.value
    });

    if (this.emptyTextField(e.target.value)) {
      FriendActions.resetFriends();
      return;
    }

    FriendActions.filterFriends(e.target.value, friendList);
  }

  hasNoResults = users => users && users.length === 0;

  renderMatchedResults = (users) => {
    if (this.hasNoResults()) {
      return <div />;
    }
    return users.map(user => (
      <button key={user.id}>
        <img alt="profile-img" className={styles.userImage} src={user.profile_image_url} />
        <p className={styles.userName}> {user.name} </p>
      </button>
    ));
  }

  render() {
    const hasMatches = true;
    const SearchComponent = this;
    const friendStore = this.props.friendStore;
    const friends = friendStore.friendList || [];

    if (!friends) {
      return (
        <div> loading ... </div>
      );
    }

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
        <div className={`${hasMatches ? styles.showMatches : ''} ${styles.results}`}>
          {this.renderMatchedResults(friends)}
        </div>
      </div>
    );
  }
}

export default Search;
