import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { renderToString } from 'react-dom/server';

import alt from './alt';
import bootstrap from './appBootstrap';
import defaultRoutes from './routes/routes';

const domEntryElement = document.getElementById('entry');

const getRouter = routes => (
  <Router history={browserHistory}>
    {routes}
  </Router>
);
/* Asssume no serverRendering on start */

window.__serverRendering = false; // this is handled by the server

/* Set up preload and render for react app */
window.onload = function preLoad() {
  const isServerRendering = window.__serverRendering;
  const serverRenderProps = window.__serverRenderProps;
  //const routes = defaultRoutes;
  const router = getRouter(defaultRoutes);

  alt.bootstrap(JSON.stringify(bootstrap.appState));

  if (isServerRendering) {
    const serverTemplate = renderToString(serverRenderProps);
    domEntryElement.innerHTML = serverTemplate;
    return;
  }

  render(router, domEntryElement);
};

