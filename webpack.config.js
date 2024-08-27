const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugins/test-plugin");
const BannerWebpackPlugin = require("./plugins/banner-plugin");
const CleanWebpackPlugin = require("./plugins/clean-plugin");
const AnalyzeWebpackPlugin = require("./plugins/analyze-plugin");
// const test = require("./loaders/demo/test");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "static/js/[name].js",
    // clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: ["./loaders/demo/test", "./loaders/demo/test1"],
        // loader: "./loaders/demo/test2",
        /* use: [
          "./loaders/demo/test4",
          "./loaders/demo/test5",
          "./loaders/demo/test6",
        ], */
        loader: "./loaders/clean-log-loader",
      },
      /* {
        test: /\.js$/,
        loader: "./loaders/banner-loader",
        options: {
          author: "as.chen",
          // age:"18", // 如果schema设置additionalProperties为false则不能额外添加未设置的属性
        },
      }, */
      {
        test: /\.js$/,
        loader: "./loaders/babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: ["./loaders/file-loader"],
        type: "javascript/auto", // 阻止webpack默认处理图片资源,只使用fileloader
      },
      {
        test: /\.css$/,
        use: ["./loaders/style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // new TestPlugin(),
    new BannerWebpackPlugin(
      (options = {
        author: "as.chen",
      })
    ),
    new CleanWebpackPlugin(),
    new AnalyzeWebpackPlugin(),
  ],
  mode: "development",
  // devtool: "source-map",
};
