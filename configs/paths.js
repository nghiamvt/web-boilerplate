const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    // files
    mainEntry: resolveApp('src/index.js'),
    appHtml: resolveApp('public/index.html'),
    appFavicon: resolveApp('configs/favicon.ico'),
    packageJSON: resolveApp('package.json'),
    dotenv: resolveApp('.env'),
    yarnLockFile: resolveApp('yarn.lock'),

    vendorHashFileName: 'vendor_hash',
    DLL_LIB_FORMAT: '[name]_dll',
    DLL_FILE_FORMAT: '[name].dll.js',
    DLL_MANIFEST_FILE_FORMAT: '[name]-manifest.json',

    // directories
    appRoot: resolveApp(''),
    appSrc: resolveApp('src'),
    appBuild: resolveApp('build'),
    appDev: resolveApp('build/dev'),
    appDist: resolveApp('build/dist'),
    appCache: resolveApp('.cache'),
    appPublic: resolveApp('public'),

    // TODO: change base on env
    appPublicPath: '/',
    publicUrl: '',

    WEBPACK_CONFIG_VENDOR: resolveApp('configs/webpack.vendor'),
    WEBPACK_CONFIG_SERVER: resolveApp('configs/webpack.server'),
    WEBPACK_CONFIG_DEV: resolveApp('configs/webpack.dev'),
    WEBPACK_CONFIG_PROD: resolveApp('configs/webpack.prod'),
};
