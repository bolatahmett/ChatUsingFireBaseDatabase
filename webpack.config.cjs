const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');


var dotenvConfig = dotenv.config({ path: __dirname + '/.env' });
module.exports = env => {
    console.log(env);
    return {
        entry: './app/src/index.js',
        target: "web",
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, "public"),
        },
        resolve: {
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        },
        module: {
            rules: [
                { test: /\.(js)$/, use: 'babel-loader', exclude: path.resolve(__dirname, 'node_modules/') },
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                {
                    test: /\.m?js/,
                    resolve: {
                        fullySpecified: false
                    }
                }
            ]
        },
        mode: 'development',
        plugins: [
            new HtmlWebpackPlugin({
                template: 'app/index.html'
            }),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(dotenvConfig.parsed)
            }),
        ]

    }
};