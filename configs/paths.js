const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    // files
    mainEntry: resolveApp('src/index.js'),
    appHtml: resolveApp('public/index.html'),
    appFavicon: resolveApp('public/favicon.ico'),
    packageJSON: resolveApp('package.json'),
    dotenv: resolveApp('.env'),
    yarnLockFile: resolveApp('yarn.lock'),

    vendorHashFileName: 'vendor_hash',
    appBundle: 'app.[hash:8].js',
    DLL_LIB: '[name]_dll',
    DLL_FILE: '[name].dll.js',
    DLL_MANIFEST_FILE: '[name]-manifest.json',
    CSS_FILE: '[name].[contenthash].css',
    publicPath: '',

    // directories
    appRoot: resolveApp(''),
    appSrc: resolveApp('src'),
    appBuild: resolveApp('build'),
    appDev: resolveApp('build/dev'),
    appDist: resolveApp('build/dist'),
    appPublic: resolveApp('public'),

    WEBPACK_CONFIG_VENDOR: resolveApp('configs/webpack.vendor'),
    WEBPACK_CONFIG_SERVER: resolveApp('configs/webpack.server'),
    WEBPACK_CONFIG_DEV: resolveApp('configs/webpack.dev'),
    WEBPACK_CONFIG_PROD: resolveApp('configs/webpack.prod'),
};
