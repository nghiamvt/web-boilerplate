module.exports = (webpackConfigDev, paths) => {
    return {
        // Enable hot reloading server. It will provide /sockjs-node/ endpoint
        // for the WebpackDevServer client so it can learn when the files were
        // updated. The WebpackDevServer client is included as an entry point
        // in the Webpack development configuration. Note that only changes
        // to CSS are currently hot reloaded. JS changes will refresh the browser.
        hot: true,
        // Enable gzip compression of generated files.
        compress: true,
        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting.
        clientLogLevel: 'none',
        // Terminal configurations
        // https://webpack.github.io/docs/node.js-api.html#stats
        stats: {
            assets: true,
            assetsSort: false,
            colors: true,
            version: true,
            hash: false,
            timings: true,
            chunks: false,
            children: false, // Child html-webpack-plugin for "index.html"
        },
        contentBase: webpackConfigDev.output.outputPath,
        // It is important to tell WebpackDevServer to use the same "root" path
        // as we specified in the config. In development, we always serve from /.
        publicPath: webpackConfigDev.output.publicPath,
        // https://github.com/facebookincubator/create-react-app/issues/293
        watchOptions: {
            ignored: /node_modules/,
        },
        // http://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option
        historyApiFallback: {
            index: paths.appPublicPath,
            // See https://github.com/facebookincubator/create-react-app/issues/387.
            disableDotRule: true,
        },
    };
};
