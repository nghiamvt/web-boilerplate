const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const chalk = require('chalk');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const paths = require('../configs/paths');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const { choosePort, prepareUrls, createCompiler } = require('react-dev-utils/WebpackDevServerUtils');

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
        const webpackConfigVendor = require(paths.WEBPACK_CONFIG_VENDOR)(paths, packageJSON, webpack);
        resolve({ packageJSON, webpackConfigVendor });
    });
}
// ==========================================================
/**
 * Build webpack DLL bundle (contain common libs)
 * @param packageJSON
 * @param webpackConfigVendor
 * @returns {Promise}
 * Reference:
 * - http://engineering.invisionapp.com/post/optimizing-webpack/
 * - https://robertknight.github.io/posts/webpack-dll-plugins/
 */

function buildVendors({ packageJSON, webpackConfigVendor }) {
    // build current vendors hash
    let shouldBuildVendors = true;
    // https://nodejs.org/api/crypto.html
    // crypto.createHash(algorithm): Creates and returns a Hash object.
    // hash.update(data[, input_encoding]): Updates the hash content with the given data
    // JSON.stringify: convert to a JSON string
    const currentVendorsHash = crypto.createHash('md5').update(
        JSON.stringify({
            dependencies: packageJSON.dependencies ? packageJSON.dependencies : null,
            devDependencies: packageJSON.devDependencies ? packageJSON.devDependencies : null,
        })
    ).digest('hex');

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

    return new Promise((resolve, reject) => {
        if (!shouldBuildVendors || !packageJSON.dependencies) {
            return resolve();
        }

        return webpack(webpackConfigVendor).run((err) => {
            if (err) {
                reject(err);
            }

            // save hash
            fs.writeFileSync(vendorHashFilePath, currentVendorsHash, 'utf-8');

            // done
            resolve();
        });
    });
}
// ==========================================================
function startDevServer() {
    return new Promise((resolve, reject) => {
        const DEFAULT_PORT = parseInt(process.env.PORT);
        const HOST = process.env.HOST;
        const webpackConfigDev = require(paths.WEBPACK_CONFIG_DEV);

        choosePort(HOST, DEFAULT_PORT).then((port) => {
            if (port === null) return;
            const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
            const appName = require(paths.packageJSON).name;
            const urls = prepareUrls(protocol, HOST, port);

            // Create a webpack compiler that is configured with custom messages.
            const useYarn = fs.existsSync(paths.yarnLockFile);
            const compiler = createCompiler(webpack, webpackConfigDev, appName, urls, useYarn);

            const webpackConfigDevServer = require(paths.WEBPACK_CONFIG_SERVER)(webpackConfigDev, paths);
            const devServer = new WebpackDevServer(compiler, webpackConfigDevServer);

            devServer.listen(port, HOST, (err) => {
                if (err) {
                    reject(err);
                }
                clearConsole();
                console.log(chalk.cyan('Starting the development server...\n'));
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
