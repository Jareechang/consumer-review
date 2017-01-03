import React, { Component } from 'react'
import { render } from 'react-dom'

import { users as friends } from '../friends.json'

/* Components */

import TweetContainer from './components/Tweets/index'

const searchStyles = {
  marginTop: '25px',
  width: '100%'
}

class Search extends Component {
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
      matches: friends.filter(friend =>
        friend.name.match(new RegExp(e.target.value, 'i'))
      )
    })
  }

  render() {
    const resultStyles = {
      width: '100%',
      height: '100px',
      color: '#5c5757',
      padding: '20px',
      background: '#f5f5f5',
      display: 'none'
    }
    const renderMatchedResults = users =>
      users.map(user => <p> {user.name} </p>)

    if (this.state.text.length > 0) {
      resultStyles.display = 'block'
    }

    return (
      <div>
        <div className='input-group' style={searchStyles}>
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
        <div style={resultStyles}>
        {renderMatchedResults(this.state.matches)}
        </div>
      </div>
    )
  }
}


class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(friends)
    return (
      <div className='row'>
        <div className='container'>
          <div className='col-md-8'>
            <TweetContainer />
          </div>
          <div className='col-md-4'>
            <Search />
          </div>
        </div>
      </div>
    )
  }
}

const entry = document.getElementById('entry')

render(<App />, entry)
