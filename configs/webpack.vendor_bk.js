const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const CompressionPlugin = require('compression-webpack-plugin');

const packageJSON = require(paths.packageJSON);

module.exports = ({ isProduction }) => {
	const rootPath = isProduction ? paths.appDist : paths.appDev;
	return {
		entry: { // vendor = [name]
			vendor: Object.keys(packageJSON.dependencies),
		},
		output: {
			path: path.join(rootPath, isProduction ? '' : paths.publicPath),
			filename: paths.DLL_FILE,
			library: paths.DLL_LIB,
			publicPath: paths.publicPath,
		},
		plugins: [
			new webpack.DllPlugin({
				// The path to the manifest file which maps between
				// modules included in a bundle and the internal IDs
				// within that bundle.
				path: path.join(rootPath, paths.DLL_MANIFEST_FILE),
				// The name of the global variable which the library's
				// require function has been assigned to. This must match the
				// output.library option above.
				name: paths.DLL_LIB,
			}),
			isProduction && new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production'),
					ENVIRONMENT: JSON.stringify('production'),
				},
			}),
			isProduction && new webpack.optimize.UglifyJsPlugin(),
			isProduction && new CompressionPlugin({
				asset: '[path].gz[query]',
				algorithm: 'gzip',
				test: /\.(js|css)$/,
				threshold: 10240,
				minRatio: 0.8,
			}),
		].filter(Boolean),
	};
};
