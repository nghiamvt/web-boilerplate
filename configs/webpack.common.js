const paths = require('./paths');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    // https://webpack.js.org/configuration/devtool/
    devtool: "source-map",
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules
    target: "web",
    entry: [
        require.resolve('./polyfills'),
        paths.mainEntry
    ],
    output: {
        // This is the JS bundle containing code from all our entry points, and the Webpack runtime.
        // We are not actually outputting any files when running the workflow,
        // but we want these “in-memory” files to be fetched from the same path as in production,
        // Ex: <script src="main.bundle.js"></script>
        filename: isProduction ? '[name].[hash].bundle.js' : "[name].bundle.js",
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: paths.appBuild,
        // Webpack uses `publicPath` to determine where the app is being served from.
        // In development, we always serve from the root. This makes config easier.
        // Ex: "/" => http://localhost:3000/, "/homepage/" => http://localhost:3000/homepage
        publicPath: paths.appPublicPath,
        pathinfo: !isProduction,
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loaders: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader?modules', ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        modules: [
            "node_modules",
            paths.appSrc,
        ],
    },
    plugins: [
        // TODO: remove configs in dev & prod
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        //     }
        // }),
    ]
};
