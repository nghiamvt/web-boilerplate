const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const WebpackCommonConfig = require('./webpack.common.js');
const webpackVendorCfg = require('./webpack.vendor');

const dllPlugins = [].concat(Object.keys(webpackVendorCfg.entry).map((e) => {
    const manifestPath = path.join(paths.appCache, paths.DLL_MANIFEST_FILE_FORMAT.replace(/\[name\]/g, e));
    return new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(manifestPath),
    });
}));
module.exports = merge(WebpackCommonConfig, {
    devtool: 'cheap-module-source-map',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${process.env.HOST}:${process.env.PORT}`,
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        paths.mainEntry,
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                        ] },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            // `dll` is our self-defined option to pass the paths of the built dll files
            // to the HTML template. The dll JavaScript files are loaded in <script> tags
            // within the template to be made available to the application.
            dll: {
                paths: Object.keys(webpackVendorCfg.entry).map((entryName) => {
                    return path.join(paths.appCache, paths.DLL_FILE_FORMAT.replace(/\[name\]/g, entryName));
                }),
            },
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.join(paths.appCache, 'vendor-manifest.json')),
        }),
        /*(() => {
            try {
                return Object.keys(webpackVendorCfg.entry).map((e) => {
                    const manifestPath = path.join(paths.appCache, paths.DLL_MANIFEST_FILE_FORMAT.replace(/\[name\]/g, e));
                    return new webpack.DllReferencePlugin({
                        context: '.',
                        manifest: require(manifestPath),
                    });
                });
            } catch (e) {
                console.error('DllReferencePlugin Error: ', e);
                return { apply: () => null };
            }
        })(),*/
    ],
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },
});
