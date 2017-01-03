import React, { Component } from 'react'
import { users as friends } from '../../../friends.json'

import FriendStore from '../../stores/FriendStore'
import FriendActions from '../../actions/FriendActions'
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
    this.setState({
      text: e.target.value
    })
    if (e.target.value === '') {
      return FriendActions.resetFriends()
    }
    FriendActions.filterFriends(e.target.value)
  }

  render() {
    const renderMatchedResults = users =>
      users.map(user => <p> {user.name} </p>)

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
