const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const serverRootPath = '/news';
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-dom');
const StaticRouter = ReactRouter.StaticRouter;

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
    const context = {};
    const clientPreload = ReactDOMServer.renderToString(
      React.createElement(StaticRouter, { location: req.url, context }, React.createElement(routes))
    );

    if (context.url) {
      res.redirect(context.status, context.url);
    }

    res.status(200).write(template({
      clientAssets: assetPipeline.getClientAssets(this.assetRootPath),
      appPreloadState: appPreloadState,
      serverRendering: true,
      clientPreload: clientPreload
    }));
    res.end();
  }
};
