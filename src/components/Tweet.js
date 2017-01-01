import React, { Component } from 'react'
import TweetStore from '../stores/TweetStore'

export default class Tweet extends Component {
  constructor(props) {
    super(props)
    this.state = TweetStore.getState()
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    TweetStore.listen(this._onChange)
  }

  componentWillUnmount() {
    TweetStore.unlisten(this._onChange)
  }

  _onChange(state) {
    this.setState(state)
  }

  render() {
    /* Make Tweet Card component */
    return (
      <div>tweets goes here</div>
    )
  }
}
