const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["ts-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    resolve: {
        extensions: [
            ".wasm",
            "mjs",
            ".cjs",
            ".js",
            ".json",
            ".tsx",
            ".ts",
            ".css",
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            publicPath: "/",
        }),
        new CopyPlugin({
            patterns: [{ from: "assets", to: "assets" }],
        }),
    ],
};
