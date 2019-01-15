"use strict";

const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common");

const port = process.env.PORT || 8082;

const outputPath = path.resolve(__dirname, "public");

module.exports = merge(common, {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "#eval-source-map",
  devServer: {
    contentBase: outputPath,
    index: "index.html",
    port: port,
    overlay: {
      errors: true,
      warnings: true
    },
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
          configFile: "tsconfig.dev.json"
        }
      },
      {
        test: /\.(c|sc|le)ss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.runtime.js"
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      inject: true
    })
  ]
});
