const paths = require('./paths');
const env = require('../configs/.env');

module.exports = {
	hot: true,
	host: env.HOST,
	port: env.PORT,
	contentBase: paths.appDist,
	// In development, always serve from /.
	publicPath: paths.publicPath,
	// HMR on console.
	clientLogLevel: 'none',
	compress: true,
	disableHostCheck: false,
	historyApiFallback: {
		disableDotRule: true,
	},
	// quiet: true,
	stats: {
		assets: true,
		assetsSort: 'field',
		colors: true,
		version: false,
		hash: false,
		timings: false,
		builtAt: false,
		chunks: false,
		modules: false,
		performance: true,
		children: false, // "index.html"
	},
};
