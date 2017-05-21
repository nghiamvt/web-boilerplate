const webpack = require('webpack');
const merge = require('webpack-merge');

// const paths = require('./paths');
const WebpackCommonConfig = require('./webpack.common.js');

module.exports = merge(WebpackCommonConfig, {
    plugins: [
        // The DefinePlugin performs search-and-replace operations on the original source code.
        // Any occurrence of process.env.NODE_ENV in the imported code is replaced by "production"
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
});
