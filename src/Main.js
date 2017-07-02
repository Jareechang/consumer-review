import React from 'react';

import TweetContainer from './components/Tweets/index';

import Search from './components/Search/index';

const Main = _ => (
  <div className="row">
    <div className="container">
      <div className="col-md-8">
        <TweetContainer />
      </div>
      <div className="col-md-4">
        <Search />
      </div>
    </div>
  </div>
);

export default Main;
