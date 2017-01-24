import React from 'react'
import { Route } from 'react-router'

const Github = props =>
  <div>
    <p> this is the github page </p>
  </div>

const Hackernews = props =>
  <div>
    <p> this is the HN page</p>
  </div>

const routes = index => (
  <Route path="/" >
    {index}
    <Route path="github" component={Github}/>
    <Route path="hn" component={Hackernews}/>
  </Route>
)

export default routes
