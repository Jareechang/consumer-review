/* ES6/7 transpilation with css modules */
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['css-modules-transform']
});


const config = require('./config.js').default;
/* External */
const express = require('express');
const app = express();

/* Services  */
const TwitterService = require('../services/twitter.js');

/* Config */
const PORT = config.app.port || process.env.PORT;
const path = require('path');
const serverRootPath = config.server.rootPath;
const ASSET_ROOT_PATH = config.client.rootPath;

const handleError = (err) => console.log(err.stack);

/* Utility */
const ServerRendering = require('./ServerRendering.js');
ServerRendering.setAssetRootPath(ASSET_ROOT_PATH);

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
