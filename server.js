/* ES6/7 transpilation with css modules */
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['css-modules-transform']
});

const express = require('express');
const app = express();
const PORT = '8080' || process.env.PORT;
const TwitterService = require('./services/twitter.js');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const webpackConfig = require('./webpack.config.js');


/* Asset pipeline handling  */
const ASSET_ROOT_PATH = '/public';
const outputFileName = webpackConfig.output.filename;

const clientAssetPath = ASSET_ROOT_PATH + '/' + outputFileName;

/* React specific for server rendering */

const React = require('react');
const ReactDomServer = require('react-dom/server');
const renderToString = ReactDomServer.renderToString;

const routes = require('./src/routes/routes.js').default;
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const match = ReactRouter.match;
const RouterContext = ReactRouter.RouterContext;
const baseTemplate = fs.readFileSync(__dirname + '/src/index.template.html');
const template = _.template(baseTemplate);

const handleError = (err) => console.log(err.stack);

app.use(ASSET_ROOT_PATH, express.static(path.join(__dirname, 'dist')));

console.log("serving static assets in %s from /public", path.join(__dirname, 'dist'));

/* formalize api later, use this to view JSON data*/
app.get(['/api/tweets/', '/api/tweets/:screenName'], (req, res) => {
  /* call some function to get pass in :screeNname into twitter api  */
  const sendData = res => data => res.send(data);
  const screenName = req.params.screenName;
  // Gets your own tweets by default
  TwitterService.getTweetsByUsername(screenName)
    .catch(handleError)
    .then(sendData(res));
})

app.get('/news*', (req, res) => {
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectionLocation.pathName + redirectionLocation.search);
    } else if (renderProps) {
      let body = renderToString(React.createElement(RouterContext, renderProps));
      res.status(200).write(template({
        injectReactApp: body,
        clientAssetPath: clientAssetPath
      }));
      res.end();
    } else {
      res.status(400);
    }
  })
  //res.sendFile(path.join(__dirname + '/dist/index.html'));
})

app.listen(PORT, _ => console.log('listening on %s', PORT))
