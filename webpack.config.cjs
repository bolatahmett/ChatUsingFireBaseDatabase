const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');


var dotenvConfig = dotenv.config({ path: __dirname + '/.env' });
console.log(dotenvConfig.parsed);
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
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".esm.js"],
        },
        module: {
            rules: [
                { test: /\.(js)$/, use: 'babel-loader' },
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
                "process.env": dotenvConfig.parsed
            }),
        ]

    }
};