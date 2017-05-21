const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const progressBarPlugin = require('progress-bar-webpack-plugin');

const paths = require('./paths');
const WebpackCommonConfig = require('./webpack.common.js');

module.exports = merge(WebpackCommonConfig, {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + paths.host + ':' + paths.port,
        'webpack/hot/only-dev-server',
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            inject: true,
            title: 'React Web Boilerplate',
            template: paths.appTemplate,
            favicon: paths.appFavicon,
            vendorsFilePath: `/.cache/${paths.vendorEntryName}.bundle.js`, // TODO: put .cache into paths
        }),
    ]
});
