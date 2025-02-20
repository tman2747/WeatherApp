// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "eval-source-map",
	devServer: {
		watchFiles: ["./src/template.html", "./src/style.css"],
		open: true, // Automatically open the browser
	},
});
