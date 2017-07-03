const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const WebpackCommonConfig = require('./webpack.common.js');

module.exports = merge(WebpackCommonConfig, {
    devtool: 'source-map',
    // Don't attempt to continue if there are any errors
    bail: true,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
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
                                ],
                            },
                        },
                        'sass-loader',
                    ],
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('style/[id].[name].[contenthash].css'),
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ],
});
