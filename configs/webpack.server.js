const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = ({ proxyConfig, allowedHost }) => {
    return {
        disableHostCheck: !proxyConfig,
        compress: true,
        clientLogLevel: 'none',
        contentBase: paths.appDev,
        watchContentBase: true,
        hot: true,
        // It is important to tell WebpackDevServer to use the same "root" path
        // as we specified in the config. In development, we always serve from /.
        publicPath: paths.appPublicPath,
        quiet: false,
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
        https: protocol === 'https',
        host,
        // http://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option
        historyApiFallback: {
            index: paths.appPublicPath,
            disableDotRule: true,
        },
        public: allowedHost,
        proxy: proxyConfig,
    };
};
