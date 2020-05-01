"use strict"

const path = require("path");

module.exports = {
    entry: {
      dev: ["./src/app.js"]
    },
    output: {
      filename: "app.js",
      path: path.resolve(__dirname),
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      publicPath: "/",
      historyApiFallback: true
    }
}
