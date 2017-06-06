const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const progressBarPlugin = require('progress-bar-webpack-plugin');

const paths = require('./paths');
const WebpackCommonConfig = require('./webpack.common.js');

module.exports = merge(WebpackCommonConfig, {
    // https://webpack.js.org/configuration/devtool/
    devtool: "source-map",
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + paths.host + ':' + paths.port,
        'webpack/hot/only-dev-server',
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
                        options: {
                            plugins: () => [
                                require('autoprefixer')(),
                            ]
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        new progressBarPlugin(),
        (() => {
            try {
                return new webpack.DllReferencePlugin({
                    context: '.',
                    manifest: require(path.join(paths.appCache, `${paths.vendorEntryName}_${paths.manifestJSON}`)),
                });
            } catch (e) {
                return { apply: () => null };
            }
        })(),
    ]
});
