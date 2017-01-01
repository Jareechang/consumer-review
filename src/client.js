import React, { Component } from 'react'
import { render } from 'react-dom'

/* Components */

import Tweet from './components/Tweet'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (<Tweet />)
  }
}

const entry = document.getElementById('entry')

render(<App />, entry)
