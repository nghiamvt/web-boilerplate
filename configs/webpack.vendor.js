const path = require('path');

module.exports = (paths, packageJSON, webpack) => {
    return {
        target: 'web',
        entry: {
            // [paths.vendorsEntryName] = [name]
            [paths.vendorEntryName]: (() => {
                // get name of all dependencies package
                return Reflect.ownKeys(packageJSON.dependencies);
            })(),
        },
        output: {
            path: paths.appCache,
            filename: '[name].bundle.js',
            // name of the global var
            library: '[name]_[hash]',
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(paths.appCache, `[name]_${paths.manifestJSON}`),
                name: '[name]_[hash]', //  Keep the name consistent with output.library
            }),
        ],
    };
};
