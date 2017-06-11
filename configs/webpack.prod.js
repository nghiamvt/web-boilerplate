const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const WebpackCommonConfig = require('./webpack.common.js');

module.exports = merge(WebpackCommonConfig, {
    devtool: 'source-map',
    // Don't attempt to continue if there are any errors
    bail: true,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')(),
                                ],
                            },
                        },
                    ],
                }),
            },
        ],
    },
    plugins: [
        // The DefinePlugin performs search-and-replace operations on the original source code.
        // Any occurrence of process.env.NODE_ENV in the imported code is replaced by "production"
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new ExtractTextPlugin('style/[id].[name].[contenthash].css'),
        new webpack.optimize.UglifyJsPlugin(),
    ],
});
