const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.mjs",
  watch: true,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "src/public"),
  },
};
