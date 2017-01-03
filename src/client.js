import React, { Component } from 'react'
import { render } from 'react-dom'

/* Components */

import TweetContainer from './components/Tweets/index'

import Search from './components/Search/index'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
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