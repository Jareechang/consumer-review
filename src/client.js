import React, { Component } from 'react'
import { render } from 'react-dom'

import { Router, hashHistory, IndexRoute } from 'react-router'

import routes from './routes/routes'

/* Components */

import TweetContainer from './components/Tweets/index'

import Search from './components/Search/index'

const Main = props => (
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

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router history={hashHistory}>
        { routes(<IndexRoute component={Main}/>) }
      </Router>
    )
  }
}


const entry = document.getElementById('entry')

render(<App />, entry)
