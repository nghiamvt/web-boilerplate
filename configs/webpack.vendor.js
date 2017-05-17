const path = require('path');

module.exports = (paths, packageJSON, webpack) => {
    return {
        target: 'web',
        node: {
            fs: 'empty',
        },
        entry: {
            [paths.vendorsEntryName]: (() => {
                // get name of all dependencies package
                return Reflect.ownKeys(packageJSON.dependencies);
            })(),
        },
        output: {
            path: paths.appRoot,
            filename: '[name].dll.js',
            // name of the global var
            library: '[name]_[hash]',
        },
        // module: {
        //     rules: [
        //         {
        //             test: /\.json$/,
        //             loaders: "json-loader",
        //         },
        //     ]
        // },
        plugins: [
            // DllPlugin creates a manifest.json file, which is used by the DllReferencePlugin to map dependencies.
            new webpack.DllPlugin({
                path: paths.manifestJSON,
                name: '[name]_[hash]', //  Keep the name consistent with output.library
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin(),
        ],
    };
};
