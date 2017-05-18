const path = require('path');

function resolveApp(relativePath) {
    // process.cwd(): returns the current working directory of the Node.js process.
    return path.resolve(process.cwd(), relativePath);
}

module.exports = {
    // files
    mainEntry: resolveApp('app/index.js'),
    appTemplate: resolveApp('configs/index.html'), // TODO: move index, favicon.icon to another directory
    appFavicon: resolveApp('configs/favicon.ico'),
    packageJSON: resolveApp('package.json'),

    manifestJSON: '[name]_manifest.json',
    vendorEntryName: 'vendor',
    vendorHashFileName: 'vendor_hash',

    // directories
    appRoot: resolveApp(''),
    appSrc: resolveApp('app'),
    appBuild: resolveApp('build'),
    appCache: resolveApp('.cache'),

    WEBPACK_CONFIG_VENDOR: resolveApp('configs/webpack.vendor'),
    WEBPACK_CONFIG_DEV: resolveApp('configs/webpack.dev'),

    host: 'localhost',
    port: '3000',
};
