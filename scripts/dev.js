const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const paths = require('../configs/paths');
// const clearConsole = require('react-dev-utils/clearConsole');
// const openBrowser = require('react-dev-utils/openBrowser');
const { choosePort, prepareUrls, createCompiler, prepareProxy } = require('react-dev-utils/WebpackDevServerUtils');

// Ensure environment variables are read.
require('../configs/env');
// ==========================================================
/**
 * Prepare what necessary to build
 * @returns {Promise}
 */
function prepareToBuild() {
    return new Promise((resolve) => {
        const packageJSON = require(paths.packageJSON);
        resolve({ packageJSON });
    });
}
// ==========================================================
/**
 * Build webpack DLL bundle (contain common libs)
 * @param packageJSON
 * @returns {Promise}
 * Reference:
 * - http://engineering.invisionapp.com/post/optimizing-webpack/
 * - https://robertknight.github.io/posts/webpack-dll-plugins/
 */

function buildVendors({ packageJSON }) {
    let shouldBuildVendors = true;
    // crypto.createHash(algorithm): Creates and returns a Hash object.
    // hash.update(data[, input_encoding]): Updates the hash content with the given data
    // JSON.stringify: convert to a JSON string
    const currentVendorsHash = crypto.createHash('md5')
        .update(JSON.stringify({
            dependencies: packageJSON.dependencies ? packageJSON.dependencies : null,
            devDependencies: packageJSON.devDependencies ? packageJSON.devDependencies : null,
        })).digest('hex');

    // Check vendor bundle hash if changed
    const vendorHashFilePath = path.join(paths.appCache, paths.vendorHashFileName);
    try {
        if (fs.existsSync(vendorHashFilePath)) {
            const prevVendorsHash = fs.readFileSync(vendorHashFilePath, 'utf8');
            shouldBuildVendors = (prevVendorsHash !== currentVendorsHash);
        }
    } catch (e) {
        console.error(e);
        shouldBuildVendors = true;
    }

    const webpackConfigVendor = require(paths.WEBPACK_CONFIG_VENDOR)(paths, packageJSON, webpack);

    return new Promise((resolve, reject) => {
        if (!shouldBuildVendors || !packageJSON.dependencies) {
            return resolve({ packageJSON });
        }

        return webpack(webpackConfigVendor).run((err) => {
            if (err) { reject(err); }
            // save hash
            fs.writeFileSync(vendorHashFilePath, currentVendorsHash, 'utf-8');
            resolve({ packageJSON });
        });
    });
}
// ==========================================================
/**
 * Create webpack compiler and start dev server
 * @param packageJSON
 * @returns {Promise}
 */
function startDevServer({ packageJSON }) {
    return new Promise((resolve, reject) => {
        const DEFAULT_PORT = parseInt(process.env.PORT);
        const HOST = process.env.HOST;
        const webpackConfigDev = require(paths.WEBPACK_CONFIG_DEV);
        const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
        const appName = packageJSON.name;
        const proxySetting = packageJSON.proxy;
        const useYarn = fs.existsSync(paths.yarnLockFile);

        choosePort(HOST, DEFAULT_PORT).then((port) => {
            if (port === null) return;
            const urls = prepareUrls(protocol, HOST, port);
            const proxyConfig = prepareProxy(proxySetting, paths.appPublic);

            // Create a webpack compiler that is configured with custom messages.
            const compiler = createCompiler(webpack, webpackConfigDev, appName, urls, useYarn);

            const webpackConfigDevServer = require(paths.WEBPACK_CONFIG_SERVER)({
                webpackConfigDev,
                proxyConfig,
                allowedHost: urls.lanUrlForConfig,
            });

            console.info(chalk.cyan('\nStarting the development server...'));
            const devServer = new WebpackDevServer(compiler, webpackConfigDevServer);
            devServer.listen(port, HOST, (err) => {
                if (err) { reject(err); }
                resolve();
            });

            ['SIGINT', 'SIGTERM'].forEach((sig) => {
                process.on(sig, () => {
                    devServer.close();
                    process.exit();
                });
            });
        });
    });
}


prepareToBuild()
    .then(buildVendors)
    .then(startDevServer)
    .catch((err) => {
        console.error(new Error(err));
        process.exit(1);
    });
