var debug = process.env.NODE_ENV !== 'production';

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var publicPath = debug ? '/public' : '/';

/* Development plugins */
const developmentPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }

  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
];

/* Production plugins */
const productionPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: false,
    sourcemap: false
  })
];

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000',
    './index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include : path.join(__dirname, 'src'),
        exclude : path.join(__dirname, 'node_modules')
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0'
          ],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.(png|jpg|gif)/,
        loader: 'file-loader?limit=8192'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      }
    ]
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'index.min.js',
    publicPath: publicPath
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: publicPath
  },
  plugins: debug
    ? developmentPlugins
    : productionPlugins
};
