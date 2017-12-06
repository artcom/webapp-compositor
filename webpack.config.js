/* eslint-disable import/no-commonjs */

const path = require("path")
const webpack = require("webpack")

const publicPath = path.join(__dirname, "public")

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    path: publicPath,
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loaders: ["babel-loader", "eslint-loader?emitWarning=true"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.EnvironmentPlugin([
      "NODE_ENV",
      "ADMINISTRATION_TOPIC"
    ])
  ],
  devServer: {
    contentBase: publicPath,
    port: 5000,
    historyApiFallback: true
  }
}
