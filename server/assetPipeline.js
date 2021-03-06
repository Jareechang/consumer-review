const webpackConfig = require('../webpack.config.js');
const config = require('./config.js').default;
const combineString = (p, v) => p + " " + v;

const thirdPartyAssetConfig = {
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
  ],
  scripts: [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
  ]
};

const generateAssetTag = {
  style: function(path) {
    return `<link rel="stylesheet" href="${path}">`;
  },
  script: function(path) {
    return `<script src="${path}"></script>`;
  }
};

const getThirdPartyAssets = function() {
  const styles = thirdPartyAssetConfig.styles.map(generateAssetTag.style);
  const scripts = thirdPartyAssetConfig.scripts.map(generateAssetTag.script);
  const combinedStyles = styles.concat(scripts);
  return combinedStyles.reduce(combineString, "");
};

const generateAssetLink = function(config) {
  const publicPath = config.output.publicPath;
  const filename = config.output.filename;
  return '{path}/{filename}'
    .replace('{path}', publicPath)
    .replace('{filename}', filename);
};

const getClientAssets = function(rootAssetPath) {
  if (!rootAssetPath) {
    console.warn('rootAssetPath needs to be set in order for client asset to be loaded —-- Please see ServerRendering.setAssetRootPath');
    return;
  }
  return {
    thirdPartyAssets: getThirdPartyAssets(),
    reactScript: generateAssetTag.script(generateAssetLink(webpackConfig))
  }
};

module.exports = {
  getClientAssets: getClientAssets
};
