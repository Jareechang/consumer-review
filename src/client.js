import React, { Component } from 'react'
import { render } from 'react-dom';

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div> new app </div>
    )
  }
}

const entry = document.getElementById('entry')

render(<App />, entry)
