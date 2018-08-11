const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const xPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
	// files
	mainEntry: xPath('src/index.js'),
	appHtml: xPath('public/index.html'),
	appFavicon: xPath('public/favicon.ico'),
	packageJSON: xPath('package.json'),
	dotenv: xPath('.env'),
	yarnLockFile: xPath('yarn.lock'),

	vendorHashFileName: 'vendor_hash',
	appBundle: 'app.[hash:8].js',
	DLL_LIB: '[name]_dll',
	DLL_FILE: '[name].dll.js',
	DLL_MANIFEST_FILE: '[name]-manifest.json',
	CSS_FILE: '[name].[contenthash].css',
	publicPath: '',

	// directories
	appRoot: xPath(''),
	appSrc: xPath('src'),
	appBuild: xPath('build'),
	appDev: xPath('build/dev'),
	appDist: xPath('build/dist'),
	appPublic: xPath('public'),

	WEBPACK_CONFIG_VENDOR: xPath('configs/webpack.vendor'),
	WEBPACK_CONFIG_SERVER: xPath('configs/webpack.server'),
	WEBPACK_CONFIG: xPath('configs/webpack.client'),
};
