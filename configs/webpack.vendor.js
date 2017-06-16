const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');

const packageJSON = require(paths.packageJSON);

module.exports = {
    entry: {
        vendor: Object.keys(packageJSON.dependencies), // vendor = [name]
    },
    output: {
        path: paths.appCache,
        filename: paths.DLL_FILE_FORMAT,
        library: '[name]_[hash]',
    },
    plugins: [
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle.
            path: path.join(paths.appCache, paths.DLL_MANIFEST_FILE_FORMAT),
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above.
            name: '[name]_[hash]',
        }),
    ],
};
