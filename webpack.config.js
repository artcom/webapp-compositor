/* eslint-disable no-undef */

const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = (env, argv) => ({
  mode: argv.mode,
  devtool: argv.mode === "production" ? "source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg)$/,
        type: "asset/resource",
        generator: {
          filename: "[path][name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.ejs" }),
    new webpack.EnvironmentPlugin(["ADMINISTRATION_TOPIC"]),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
  },
})
