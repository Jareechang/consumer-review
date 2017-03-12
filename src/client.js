import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

import routes from './routes/routes';

const entry = document.getElementById('entry')

import alt from './alt';

window.alt = alt;
const router = (
  <Router history={browserHistory}>
    {routes}
  </Router>
)

render(router, entry);
