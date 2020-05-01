"use strict"

const path = require("path");

module.exports = {
  entry: {
    app: ['./src/app.js'],
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /(\.js?$)|(\.jsx?$)/,
        use: 'babel-loader',
      }
    ]
  },
  mode: 'production',
  devtool: 'inline-source-map'
}
