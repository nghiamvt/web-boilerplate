prepareToBuild()
    .then(buildVendors)
    .then(buildClient)
    .then(startDevServer)
    .catch((err) => {
        console.log(new Error(err));
        return null;
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
 * "Compiler" is a low-level interface to Webpack.
 * It lets us listen to some events and provide our own custom messages.
 * @param paths
 * @param webpackConfig
 * @returns {Promise}
 */
function buildClient() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
// ==========================================================
function startDevServer() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
