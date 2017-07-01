const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const serverRootPath = '/news';
const React = require('react');
const ReactRouter = require('react-router');
const match = ReactRouter.match;
const RouterContext = ReactRouter.RouterContext;

/* Preloaded data */
const tweets = require('../tweets.json');
const friends = require('../friends.json').users;

const appPreloadState = JSON.stringify({
  friends: friends,
  tweets: tweets
});

/* Asset pipeline handling  */
const assetPipeline = require('./assetPipeline.js');

/* Client routes */
const routes = require('../src/routes/routes.js').default;

/* Client Base html template */
const indexPath = path.join(__dirname, '../src/index.template.html');
const baseTemplate = fs.readFileSync(indexPath);
const template = _.template(baseTemplate);

module.exports = {
  setAssetRootPath: function(assetRootPath) {
    this.assetRootPath = assetRootPath;
  },
  routePath: function(req, res) {
    match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectionLocation.pathName + redirectionLocation.search);
      } else if (renderProps) {
        res.status(200).write(template({
          clientAssets: assetPipeline.getClientAssets(this.assetRootPath),
          appPreloadState: appPreloadState,
          serverRendering: true,
          serverRenderProps: JSON.stringify(renderProps)
        }));
        res.end();
      } else {
        res.status(400);
      }
    });
  }
};