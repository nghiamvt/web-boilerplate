const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const WebpackCommonConfig = require('./webpack.common.js');
const webpackVendorCfg = require('./webpack.vendor');

module.exports = merge(WebpackCommonConfig, {
    devtool: 'cheap-module-source-map',
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
    plugins: [].concat(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new ProgressBarPlugin(),
        Object.keys(webpackVendorCfg.entry).map((e) => {
            return new webpack.DllReferencePlugin({
                context: '.',
                manifest: require(path.join(paths.appDev, paths.DLL_MANIFEST_FILE_FORMAT.replace(/\[name\]/g, e))),
            });
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            // `dll` is our self-defined option to pass the paths of the built dll files
            // to the HTML template. The dll JavaScript files are loaded in <script> tags
            // within the template to be made available to the application.
            dll: {
                paths: Object.keys(webpackVendorCfg.entry).map((e) => {
                    return `${paths.appPublicPath}/${paths.DLL_FILE_FORMAT.replace(/\[name\]/g, e)}`.replace('//', '/');
                }),
            },
        })
    ),
    performance: {
        hints: false,
    },
});
