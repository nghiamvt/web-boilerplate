const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    target: "web",
    entry: [
        'babel-polyfill',
        paths.mainEntry
    ],
    output: {
        // dev use “in-memory” files
        filename: '[name].[hash].bundle.js',
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: paths.appBuild,
        // Webpack uses `publicPath` to determine where the app is being served from.
        // In development, we always serve from the root. This makes config easier.
        // Ex: "/" => http://localhost:3000/, "/homepage/" => http://localhost:3000/homepage
        publicPath: paths.appPublicPath,
        pathinfo: !isProduction,
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loaders: "babel-loader",
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        modules: [
            "node_modules",
            paths.appSrc,
        ],
    },
    plugins: [
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            inject: true,
            title: 'React Web Boilerplate',
            template: paths.appTemplate,
            favicon: paths.appFavicon,
            dll: !isProduction && `/.cache/${paths.vendorEntryName}.bundle.js`,
        }),
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};
