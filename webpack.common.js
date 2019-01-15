"use strict"

const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader"
      }
    ]
  },
  resolve: {
    extensions: ["*", ".vue", ".ts", ".tsx", ".js"]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}