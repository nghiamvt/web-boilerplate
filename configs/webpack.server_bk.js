const paths = require('./paths');

module.exports = ({ proxyConfig, allowedHost }) => {
	return {
		hot: true,
		contentBase: paths.appDist,
		disableHostCheck: !proxyConfig,
        compress: true,
        clientLogLevel: 'none',
        watchContentBase: true,
        // In development, we always serve from /.
        publicPath: paths.publicPath,
        quiet: false,
		open: true,
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
            children: false, // "index.html"
        },
        watchOptions: {
            ignored: /node_modules/,
        },
        https: false,
        host: 'localhost',
        // http://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option
        historyApiFallback: {
            index: paths.publicPath,
            disableDotRule: true,
        },
        public: allowedHost,
        proxy: proxyConfig,
	};
};
