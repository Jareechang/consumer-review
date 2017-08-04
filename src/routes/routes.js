import React from 'react';
import { Route, Switch } from 'react-router';
import Main from '../Main';

import { rootPath, generatePath } from '../utils/routeUtils';
import HackerNewsView from '../views/HackerNewsView';
import GithubView from '../views/GithubView';

const getRoutes = () => (
  <Switch>
    <Route
      exact
      path={rootPath}
      component={Main}
    />
    <Route
      path={generatePath('github')}
      component={GithubView}
    />
    <Route
      path={generatePath('hn')}
      component={HackerNewsView}
    />
  </Switch>
);

export default getRoutes;
