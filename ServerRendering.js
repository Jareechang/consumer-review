const _ = require('lodash');
const fs = require('fs');
const webpackConfig = require('./webpack.config.js');
const serverRootPath = '/news';

/* Asset pipeline handling  */
const outputFileName = webpackConfig.output.filename;

const getAssetPath = function(rootAssetPath) {
  if (!rootAssetPath) {
    console.warn('rootAssetPath needs to be set in order for client asset to be loaded —-- Please see ServerRendering.setAssetRootPath');
    return;
  }
  return rootAssetPath + '/' + outputFileName;
};

/* React specific for server rendering */
const React = require('react');
const ReactDomServer = require('react-dom/server');
const renderToString = ReactDomServer.renderToString;

const routes = require('./src/routes/routes.js').default;
const ReactRouter = require('react-router');
const match = ReactRouter.match;
const RouterContext = ReactRouter.RouterContext;
const baseTemplate = fs.readFileSync(__dirname + '/src/index.template.html');
const template = _.template(baseTemplate);

module.exports = {
  rootPath : serverRootPath,
  setAssetRootPath: function(assetRootPath) {
    this.assetRootPath = assetRootPath;
  },
  match: function(req, res) {
      match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectionLocation.pathName + redirectionLocation.search);
        } else if (renderProps) {
          let body = renderToString(React.createElement(RouterContext, renderProps));
          res.status(200).write(template({
            injectReactApp: body,
            clientAssetPath: getAssetPath(this.assetRootPath)
          }));
          res.end();
        } else {
          res.status(400);
        }
      });
  }
};
