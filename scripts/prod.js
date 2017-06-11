const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const paths = require('../configs/paths');

// start build time
global.BUILD_STARTED = Date.now();
process.env.NODE_ENV = 'production';

prepareToBuild()
    .then(buildClient)
    .then(reportBuildStatus)
    .catch((err) => {
        console.error(new Error(err));
        process.exit(1);
    });

// ==========================================================
/**
 * Prepare what necessary to build
 * @returns {Promise}
 */
function prepareToBuild() {

    const removeFolderRecursive = function(path) {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file){
                const curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) {
                    removeFolderRecursive(curPath); // recurse
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };


    return new Promise((resolve) => {
        const webpackConfigProd = require(paths.WEBPACK_CONFIG_PROD);

        removeFolderRecursive(paths.appBuild);
        fs.mkdirSync(paths.appBuild);

        resolve({ webpackConfigProd });
    });
}

// ==========================================================
/**
 * Creating application bundles
 * @returns {Promise}
 */
function buildClient({ webpackConfigProd }) {
    return new Promise((resolve, reject) => {
        console.log('Creating an optimized production build...');
        console.log();
        webpack(webpackConfigProd).run((err, stats) => {
            const messages = formatWebpackMessages(stats.toJson({}, true));
            if (!messages.errors.length && !messages.warnings.length) {
                console.log(chalk.green('Compiled successfully!'));
                console.log();
            }

            // If errors exist, only show errors.
            if (messages.errors.length) {
                console.log(chalk.red('Failed to compile.'));
                reject(messages.errors);
            }

            // Show warnings if no errors were found.
            if (messages.warnings.length) {
                console.log(chalk.yellow('Compiled with warnings.'));
                reject(messages.warnings);
                messages.warnings.forEach(message => console.error(message));
            }

            return resolve();
        });
    });
}

// ==========================================================
/**
 * Report build status
 */
function reportBuildStatus() {
    console.info('----\n==> ✅  Building production completed (%dms).', (Date.now() - global.BUILD_STARTED));
    process.exit(0);
}
