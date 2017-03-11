const path = require('path');

const config = {
  context: __dirname,
  entry: ['babel-polyfill', './src/index'],
  output: {
    path: path.join(__dirname, './app'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(bin)|(gb)$/,
        exclude: /node_modules/,
        loader: 'buffer-loader',
      }
    ],
  }
};

module.exports = config;
