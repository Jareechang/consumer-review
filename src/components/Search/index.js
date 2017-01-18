import React, { Component } from 'react'
import { users as friends } from '../../../friends.json'

import FriendStore from '../../stores/FriendStore'
import FriendActions from '../../actions/FriendActions'
import TweetActions from '../../actions/TweetActions'
import styles from './styles.css'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      matches: FriendStore.getState().friends
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    FriendStore.listen(this._onChange)
  }

  componentWillUnmount() {
    FriendStore.unlisten(this._onChange)
  }

  _onChange(state) {
    this.setState({
      matches: state.friends
    })
  }

  handleTextChange(e) {
    const emptyTextField = value => value === ''

    this.setState({
      text: e.target.value
    })

    emptyTextField(e.target.value) ?
      FriendActions.resetFriends()
      : FriendActions.filterFriends(e.target.value)
  }

  render() {
    const updateTweetsFrom = user => TweetActions.fetchTweetsByUserName(user.screen_name)
    const renderMatchedResults = users =>
      users.map(user =>
        ( <div key={user.id} onClick={updateTweetsFrom(user)}>
            <img className={styles.userImage} src={user.profile_image_url} />
            <p className={styles.userName}> {user.name} </p>
          </div>
        )
      )

    const hasMatches = () => this.state.matches.length > 0

    return (
      <div className={styles.searchSection}>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            onChange={this.handleTextChange}
            value={this.state.text}
          />
          <span className='input-group-btn'>
            <button className='btn btn-secondary'>Search</button>
          </span>
        </div>
        <div className={`${hasMatches() ? styles.showMatches : ''} ${styles.results}`}>
          {renderMatchedResults(this.state.matches)}
        </div>
      </div>
    )
  }
}
