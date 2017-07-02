import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Main';

const rootPath = '/news';

const Github = _ => (
  <div>
    <p> this is the github page </p>
  </div>
);

const Hackernews = _ => (
  <div>
    <p> this is the HN page</p>
  </div>
);

const getRoutes = () => (
  <div>
    <Route exact path={rootPath} component={Main} />
    <Route path="github" component={Github} />
    <Route path="hn" component={Hackernews} />
  </div>
);

export default getRoutes;
