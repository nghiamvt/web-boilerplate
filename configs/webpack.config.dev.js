const path = require('path');
const paths = require('./paths');

module.exports = {
    devtool: "source-map",
    entry: [
        // We ship a few polyfills by default:
        require.resolve('./polyfills'),
        // We include the app code last so that if there is a runtime error during
        // initialization, it doesn't blow up the WebpackDevServer client, and
        // changing JS code would still trigger a refresh.
        paths.mainEntry,
    ],
    output: {
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: paths.appBuild,
        // This is the JS bundle containing code from all our entry points, and the Webpack runtime.
        // We are not actually outputting any files when running the workflow,
        // but we want these “in-memory” files to be fetched from the same path as in production,
        // Ex: <script src="/static/js/bundle.js"></script>
        filename: "static/js/bundle.js",
        // Webpack uses `publicPath` to determine where the app is being served from.
        // In development, we always serve from the root. This makes config easier.
        // Ex: "/" => http://localhost:3000/, "/homepage/" => http://localhost:3000/homepage
        publicPath: "/",
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
    },
    module: {
        rules: [
            // PreLoaders
            // {
            //     test: /\.js$/,
            //     enforce: "pre",
            //     loader: "eslint-loader",
            //     include: paths.appSrc,
            // },
            // {
            //     test: /\.scss$/,
            //     enforce: "pre",
            //     loader: 'sasslint',
            //     include: paths.appSrc,
            // }
            {
                test: /\.js?$/,
                loaders: "babel-loader",
                include: paths.appSrc,
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.scss', ''],
    }
};
