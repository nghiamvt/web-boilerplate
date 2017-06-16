const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');

const paths = require('./paths');
const WebpackCommonConfig = require('./webpack.common.js');

module.exports = merge(WebpackCommonConfig, {
    // https://webpack.js.org/configuration/devtool/
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
        // (() => {
        //     try {
        //         const manifestFile = path.join(paths.appCache, `${paths.vendorEntryName}_${paths.manifestJSON}`);
        //         return new webpack.DllReferencePlugin({
        //             context: '.',
        //             manifest: require(manifestFile),
        //         });
        //     } catch (e) {
        //         return { apply: () => null };
        //     }
        // })(),
    ],
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },
});
