const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigDev = require('../configs/webpack.config.dev.js');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const clearConsole = require('react-dev-utils/clearConsole');
const chalk = require('chalk');

buildClient()
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
        resolve();
    });
}
// ==========================================================
/**
 * Build webpack DLL bundle (contain common libs)
 * @param buildConfig
 * @param packageJSON
 * @returns {Promise}
 * Reference:
 * - http://engineering.invisionapp.com/post/optimizing-webpack/
 * - https://robertknight.github.io/posts/webpack-dll-plugins/
 */

function buildVendors() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
// ==========================================================
/**
 * The Compiler module of webpack is the main engine that creates a compilation instance
 * with all the options passed through webpack CLI or webpack api or webpack configuration file.
 * @param paths
 * @param webpackConfig
 * @returns {Promise}
 */
function buildClient() {
    return new Promise((resolve, reject) => {
        // "Compiler" is a low-level interface to Webpack.
        // It lets us listen to some events and provide our own custom messages.
        const compiler = webpack(webpackConfigDev);

        // "invalid" event fires when you have changed a file, and Webpack is
        // recompiling a bundle. WebpackDevServer takes care to pause serving the
        // bundle, so if you refresh, it'll wait instead of serving the old one.
        // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
        compiler.plugin('invalid', function() {
            clearConsole();
            console.log('Compiling...');
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
                console.log('The app is running at: ' + chalk.cyan('http://localhost:3000/'));
                console.log();
            }

            // If errors exist, only show errors.
            if (messages.errors.length) {
                console.log(chalk.red('Failed to compile.'));
                console.log();
                messages.errors.forEach(message => {
                    console.log(message);
                    console.log();
                });
                return;
                reject(messages.errors);
            }

            // Show warnings if no errors were found.
            if (messages.warnings.length) {
                console.log(chalk.yellow('Compiled with warnings.'));
                console.log();
                messages.warnings.forEach(message => {
                    console.log(message);
                    console.log();
                });
                reject(messages.warnings);
            }
        });

        resolve({ compiler });
    });
}
// ==========================================================
function startDevServer({ compiler }) {
    return new Promise((resolve, reject) => {
        const devServer = new WebpackDevServer(compiler, {
            // contentBase: webpackConfigDev.output.outputPath,
            // Enable hot reloading server. It will provide /sockjs-node/ endpoint
            // for the WebpackDevServer client so it can learn when the files were
            // updated. The WebpackDevServer client is included as an entry point
            // in the Webpack development configuration. Note that only changes
            // to CSS are currently hot reloaded. JS changes will refresh the browser.
            hot: true,
            // Terminal configurations
            // https://webpack.github.io/docs/node.js-api.html#stats
            stats: {
                assets: false,
                assetsSort: false,
                colors: true,
                version: true,
                hash: false,
                timings: true,
                chunks: false,
                children: false, // Child html-webpack-plugin for "index.html"
            },
            // It is important to tell WebpackDevServer to use the same "root" path
            // as we specified in the config. In development, we always serve from /.
            publicPath: webpackConfigDev.output.publicPath,
            // Reportedly, this avoids CPU overload on some systems.
            // https://github.com/facebookincubator/create-react-app/issues/293
            watchOptions: {
                ignored: /node_modules/
            },
        });

        // We fire up the development server and give notice in the terminal
        // that we are starting the initial bundle
        devServer.listen('localhost', '3000', (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(result);
        });
    });
}
