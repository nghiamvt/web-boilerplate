const path = require('path');

function resolveApp(relativePath) {
    // process.cwd(): returns the current working directory of the Node.js process.
    return path.resolve(process.cwd(), relativePath);
}

module.exports = {
    // files
    mainEntry: resolveApp('app/index.js'),

    // directories
    appRoot: resolveApp(''),
    appSrc: resolveApp('app'),
    appBuild: resolveApp('build'),

    host: 'localhost',
    port: '3000',
};
