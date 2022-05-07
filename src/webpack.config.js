const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    app: './src/main/js/index.js',
    preview: './src/preview/js/index.js'
  },
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve( 'dist', 'js'),
  },
};
