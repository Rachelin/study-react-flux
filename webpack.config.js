var path = require("path");
var webpack = require("webpack");

module.exports = {
  name: "app",
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /.\js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    },
    ]
  }
};
