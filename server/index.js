/* ES6/7 transpilation with css modules */
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['css-modules-transform']
});


/* External */
const express = require('express');
const webpack = require('webpack');
const app = express();

/* Services  */
const TwitterService = require('../services/twitter.js');

/* Config */
const config = require('./config.js').default;
const isDevelopment = process.env.NODE_ENV === 'development';
const PORT = config.app.port || process.env.PORT;
const path = require('path');
const webpackConfig = require('../webpack.config.js');

const serverRootPath = config.server.rootPath;
const ASSET_ROOT_PATH = config.client.rootPath;

const handleError = (err) => console.log(err.stack);

/* Utility */
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ServerRendering = require('./ServerRendering.js');
ServerRendering.setAssetRootPath(ASSET_ROOT_PATH);

if (isDevelopment) {
  const compiler = webpack(webpackConfig);

  // Webpack dev middleware
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));

  // Webpack hot middleware
  app.use(webpackHotMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
}

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

app.get('/', (req, res) => res.redirect(serverRootPath));

app.get('/news*', (req, res) => {
  ServerRendering.routePath(req, res);
});

app.listen(PORT, _ => console.log('listening on %s', PORT));
