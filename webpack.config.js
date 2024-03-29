const path = require('path');
const gbEmuConfig = require('./gb-emulator.config');

const config = {
  mode: 'development',
  entry: './src/index',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(bin)|(gb)$/,
        exclude: /node_modules/,
        loader: 'buffer-loader',
      },
    ],
  },
  resolve: {
    alias: {
      rom: path.resolve(__dirname, gbEmuConfig.romPath),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};

module.exports = config;
