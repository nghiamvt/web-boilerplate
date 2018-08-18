const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');

const packageJSON = require(paths.packageJSON);

module.exports = {
	mode: 'production',
	entry: {
		vendor: Object.keys(packageJSON.dependencies),
	},
	output: {
		path: paths.appDist,
		filename: paths.DLL_FILE_NAME,
		library: paths.DLL_LIB_NAME,
		publicPath: paths.publicPath,
	},
	plugins: [
		new webpack.DllPlugin({
			context: paths.appRoot,
			// The name of the global variable which the library's
			// require function has been assigned to.
			// This must match the output.library option above.
			name: paths.DLL_LIB,
			path: path.join(paths.appDist, paths.DLL_MANIFEST_FILE_NAME),
		}),
	],
};
