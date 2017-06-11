const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const getClientEnvironment = require('./env');

const env = getClientEnvironment();
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    target: 'web',
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        paths.mainEntry,
    ],
    output: {
        // dev use “in-memory” files
        filename: '[name].[hash].bundle.js',
        path: paths.appBuild,
        publicPath: paths.appPublicPath,
        pathinfo: !isProduction,
    },
    module: {
        rules: [
            // "file" loader makes sure those assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            {
                exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            // "url" loader works just like "file" loader but it also embeds
            // assets smaller than specified size as data URLs to avoid requests.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.js?$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        modules: [
            'node_modules',
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
        // new InterpolateHtmlPlugin(env.raw), TODO: check this
        // Makes some environment variables available to the JS code
        new webpack.DefinePlugin(env.stringified),
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};
