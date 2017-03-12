import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

import { renderToString } from 'react-dom/server'

import alt from './alt'
import bootstrap from './appBootstrap'
import defaultRoutes from './routes/routes'

const entry = document.getElementById('entry')

const getRouter = routes => {
  return (
    <Router history={browserHistory}>
      {routes}
    </Router>
  )
}
/* Asssume no serverRendering on start */

window["__serverRendering__"] = false; // this is handled by the server

/* Set up preload and render for react app */
window.onload = function() {
  const isServerRendering = window["__serverRendering__"]
  const serverRenderProps = window["__serverRenderProps__"]
  const routes = defaultRoutes
  const router = getRouter(defaultRoutes)

  alt.bootstrap(JSON.stringify(bootstrap.appState))

  if (isServerRendering) {
    const serverTemplate = renderToString(serverRenderProps);
    document.getElementById('entry').innerHTML = serverTemplate;
    return;
  }

  render(router, entry)
}

