const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const { printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');

const paths = require('../configs/paths');
const { mkDir, rmDir, copyFileToDir } = require('./common');

process.env.NODE_ENV = 'production';
// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// ==========================================================
/**
 * Prepare what necessary to build
 * @returns {Promise}
 */
function prepareToBuild() {
    return new Promise((resolve) => {
        if (fs.existsSync(paths.appDev)) {
            rmDir(paths.appDist);
        }
        mkDir(paths.appDist);
        copyFileToDir(paths.appFavicon, paths.appDist);

        const webpackConfigProd = require(paths.WEBPACK_CONFIG_PROD);
        resolve({ webpackConfigProd });
    });
}

// ==========================================================
/**
 * Creating application bundles
 * @returns {Promise}
 */
function buildClient({ webpackConfigProd }) {
    console.info(chalk.cyan('Creating an optimized production build...'));

    return new Promise((resolve, reject) => {
        webpack(webpackConfigProd).run((err, stats) => {
            if (err) return reject(err);

            const messages = formatWebpackMessages(stats.toJson({}, true));
            if (messages.errors.length) {
                return reject(new Error(messages.errors.join('\n\n')));
            }

            if (messages.warnings.length) {
                return reject(new Error(messages.warnings.join('\n\n')));
            }

            return resolve({ stats });
        });
    });
}

// ==========================================================
/**
 * Report build status
 */
function reportBuildStatus({ stats }) {
    console.info(chalk.green('==> Compiled successfully.\n'));

    console.info('File sizes after gzip:\n');
    printFileSizesAfterBuild(
        stats,
        { root: paths.appDist, sizes: {} },
        paths.appDist,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE,
    );
}


prepareToBuild()
    .then(buildClient)
    .then(reportBuildStatus)
    .catch((err) => {
        console.info(chalk.red('Failed to compile.\n'));
        console.error(err);
        process.exit(1);
    });
