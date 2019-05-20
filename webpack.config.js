const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './js/index.js', './css/style.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'css')],
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  mode: 'development'
};
