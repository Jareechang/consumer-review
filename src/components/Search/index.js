import React, { Component } from 'react'
import { users as friends } from '../../../friends.json'

import styles from './styles.css'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      matches: []
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value,
      matches: e.target.value === '' ? [] : friends.filter(friend =>
        friend.name.match(new RegExp(e.target.value, 'i'))
      )
    })
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
