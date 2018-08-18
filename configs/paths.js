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
	yarnLockFile: xPath('yarn.lock'),

	appBundle: 'app.[hash:8].js',
	DLL_LIB: '[name]_dll',
	DLL_FILE: '[name].dll.js',
	DLL_MANIFEST_FILE: '[name]-manifest.json',
	CSS_FILE: '[name].[md5:contenthash:base32:8].css',
	publicPath: '',


	DLL_LIB_NAME: '[name]_dll',
	DLL_FILE_NAME: '[name].dll.js',
	DLL_MANIFEST_FILE_NAME: '[name]-manifest.json',
	HASH_FILE_PATH: xPath('node_modules/.bin/_vendor_hash'),

	// directories
	appRoot: xPath(''),
	appSrc: xPath('src'),
	appBuild: xPath('build'),
	appDev: xPath('build/dev'),
	appDist: xPath('dist'),
	appPublic: xPath('public'),

	WEBPACK_VENDOR_CONFIG: xPath('configs/webpack.vendor'),
	WEBPACK_CONFIG: xPath('configs/webpack.config'),
	DEV_SERVER_CONFIG: xPath('configs/webpackDevServer.config'),
};
