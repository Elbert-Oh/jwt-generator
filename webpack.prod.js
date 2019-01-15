const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const common = require("./webpack.common");

const entryPath = path.resolve(__dirname, "src/index.ts");
const outputPath = path.resolve(__dirname, "docs");

module.exports = merge(common, {
  mode: "production",
  entry: entryPath,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
          configFile: "tsconfig.json"
        }
      },
      {
        test: /\.(c|sc|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.runtime.min.js"
    }
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](vue|crypto-js\/hmac-sha256|crypto-js\/enc-base64)[\\/]/,
          filename: 'vendors.[hash].js',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(["docs"]),
    new MiniCssExtractPlugin({
      filename: "jwt-generator.[hash].css"
    }),
    new OptimizeCssAssetsPlugin({
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  performance: {
    hints: "error"
  },
  output: {
    path: outputPath,
    filename: "jwt-generator.[hash].js"
  }
});
