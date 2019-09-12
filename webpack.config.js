/* eslint-disable import/no-commonjs */

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env = {}) => ({
  mode: env.production ? "production" : "development",
  devtool: env.production ? "source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(css)$/,
        loader: "css-loader"
      },
      {
        test: /\.(svg)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.ejs" })
  ],
  output: {
    filename: "[name].[contenthash].js"
  }
})
