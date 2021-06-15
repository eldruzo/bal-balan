const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin ({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CopyPlugin ({
            patterns: [
                {from: './src/pages/', to: 'pages/'},
                {from: './src/images/', to: 'images/'},
                {from: './src/service-worker.js', to: 'service-worker.js'},
                {from: './src/manifest.json', to: 'manifest.json'}
            ]
        })
    ]
} 