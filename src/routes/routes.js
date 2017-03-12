import React from 'react'
import { Route, IndexRoute } from 'react-router'

import TweetContainer from '../components/Tweets/index'

import Search from '../components/Search/index'

const Main = _ => (
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
);

const Github = _ => (
  <div>
    <p> this is the github page </p>
  </div>
)

const Hackernews = _ => (
  <div>
    <p> this is the HN page</p>
  </div>
)

const rootPath = '/news';

const routes = (
  <Route path={rootPath}>
    <IndexRoute component={Main} />
    <Route path='github' component={Github}/>
    <Route path='hn' component={Hackernews}/>
  </Route>
)

export default routes
