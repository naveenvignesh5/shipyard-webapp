const path = require("path");
const HWP = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: ["file-loader"]
      }
    ]
  },
  devtool: "inline-source-map",
  plugins: [
    new HWP({ template: path.join(__dirname, "/public/index.html") }),
    new ManifestPlugin({ fileName: "manifest.json" })
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "../shipyard-server/public/"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../shipyard-server/public/")
  }
};
