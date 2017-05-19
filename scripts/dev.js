const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const paths = require('../configs/paths');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const clearConsole = require('react-dev-utils/clearConsole');

const chalk = require('chalk');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

prepareToBuild()
    .then(buildVendors)
    .then(buildClient)
    .then(startDevServer)
    .catch((err) => {
        console.log(new Error(err));
        process.exit(1);
    });


// ==========================================================
/**
 * Prepare what necessary to build
 * @returns {Promise}
 */
function prepareToBuild() {
    return new Promise((resolve) => {
        const packageJSON = require(paths.packageJSON);
        const webpackConfigDev = require(paths.WEBPACK_CONFIG_DEV);
        const webpackConfigVendor = require(paths.WEBPACK_CONFIG_VENDOR)(paths, packageJSON, webpack);
        resolve({ packageJSON, webpackConfigDev, webpackConfigVendor });
    });
}
// ==========================================================
/**
 * Build webpack DLL bundle (contain common libs)
 * @param packageJSON
 * @param webpackConfigDev
 * @param webpackConfigVendor
 * @returns {Promise}
 * Reference:
 * - http://engineering.invisionapp.com/post/optimizing-webpack/
 * - https://robertknight.github.io/posts/webpack-dll-plugins/
 */

function buildVendors({ packageJSON, webpackConfigDev, webpackConfigVendor }) {
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
            return resolve({ webpackConfigDev });
        }

        return webpack(webpackConfigVendor).run((err) => {
            if (err) {
                reject(err);
            }

            // save hash
            fs.writeFileSync(vendorHashFilePath, currentVendorsHash, 'utf-8');

            // done
            resolve({ webpackConfigDev });
        });
    });
}
// ==========================================================
/**
 * The Compiler module of webpack is the main engine that creates a compilation instance
 * with all the options passed through webpack CLI or webpack api or webpack configuration file.
 * @param webpackConfigDev
 * @returns {Promise}
 */
function buildClient({ webpackConfigDev }) {
    return new Promise((resolve, reject) => {
        // "Compiler" is a low-level interface to Webpack.
        // It lets us listen to some events and provide our own custom messages.
        const compiler = webpack(webpackConfigDev);

        // "invalid" event fires when you have changed a file, and Webpack is
        // recompiling a bundle. WebpackDevServer takes care to pause serving the
        // bundle, so if you refresh, it'll wait instead of serving the old one.
        // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
        compiler.plugin('invalid', function(fileName) {
            clearConsole();
            console.log('Compiling...', fileName);
        });

        // "done" event fires when Webpack has finished recompiling the bundle.
        // Whether or not you have warnings or errors, you will get this event.
        compiler.plugin('done', function(stats) {
            clearConsole();

            // We have switched off the default Webpack output in WebpackDevServer
            // options so we are going to "massage" the warnings and errors and present
            // them in a readable focused way.
            const messages = formatWebpackMessages(stats.toJson({}, true));
            if (!messages.errors.length && !messages.warnings.length) {
                console.log(chalk.green('Compiled successfully!'));
                console.log();
                console.log('The app is running at: ' + chalk.cyan('http://' + paths.host + ':' + paths.port + '/'));
                console.log();
            }

            // If errors exist, only show errors.
            if (messages.errors.length) {
                console.log(chalk.red('Failed to compile.'));
                console.log();
                // messages.errors.forEach(message => {
                //     console.log(message);
                //     console.log();
                // });
                reject(messages.errors);
            }

            // Show warnings if no errors were found.
            if (messages.warnings.length) {
                console.log(chalk.yellow('Compiled with warnings.'));
                console.log();
                // messages.warnings.forEach(message => {
                //     console.log(message);
                //     console.log();
                // });
                // Teach some ESLint tricks.
                console.log('You may use special comments to disable some warnings.');
                console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
                console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
            }
        });

        resolve({ compiler, webpackConfigDev });
    });
}
// ==========================================================
function startDevServer({ compiler, webpackConfigDev }) {
    return new Promise((resolve, reject) => {
        const server = new WebpackDevServer(compiler, {
            // Enable hot reloading server. It will provide /sockjs-node/ endpoint
            // for the WebpackDevServer client so it can learn when the files were
            // updated. The WebpackDevServer client is included as an entry point
            // in the Webpack development configuration. Note that only changes
            // to CSS are currently hot reloaded. JS changes will refresh the browser.
            hot: true,
            // Terminal configurations
            // https://webpack.github.io/docs/node.js-api.html#stats
            stats: {
                assets: true,
                assetsSort: false,
                colors: true,
                version: true,
                hash: false,
                timings: true,
                chunks: false,
                children: false, // Child html-webpack-plugin for "index.html"
            },
            contentBase: webpackConfigDev.output.outputPath,
            // It is important to tell WebpackDevServer to use the same "root" path
            // as we specified in the config. In development, we always serve from /.
            publicPath: webpackConfigDev.output.publicPath,
        });

        // We fire up the development server and give notice in the terminal
        // that we are starting the initial bundle
        server.listen(paths.port, paths.host, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
