const path = require('path');

module.exports = {
  entry: {
    productPage: './client/productPage/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist/productPage'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
