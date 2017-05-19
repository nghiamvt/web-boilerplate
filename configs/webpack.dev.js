const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const progressBarPlugin = require('progress-bar-webpack-plugin');

const paths = require('./paths');

module.exports = {
    devtool: "source-map",
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules
    target: "web",
    entry: [
        // activate HMR for React
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + paths.host + ':' + paths.port,
        'webpack/hot/only-dev-server',
        require.resolve('./polyfills'),
        paths.mainEntry
    ],
    output: {
        // This is the JS bundle containing code from all our entry points, and the Webpack runtime.
        // We are not actually outputting any files when running the workflow,
        // but we want these “in-memory” files to be fetched from the same path as in production,
        // Ex: <script src="app.bundle.js"></script>
        filename: "app.bundle.js",
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: paths.appBuild,
        // Webpack uses `publicPath` to determine where the app is being served from.
        // In development, we always serve from the root. This makes config easier.
        // Ex: "/" => http://localhost:3000/, "/homepage/" => http://localhost:3000/homepage
        publicPath: "/",
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
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
        extensions: ['.js', '.json', '.scss'],
        modules: [
            "node_modules",
            paths.appSrc,
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new progressBarPlugin(),
        (() => {
            try {
                const manifestFilePath = `${paths.vendorEntryName}_${paths.manifestJSON}`;
                return new webpack.DllReferencePlugin({
                    context: '.',
                    manifest: require(path.join(paths.appCache, `${paths.vendorEntryName}_${paths.manifestJSON}`)),
                });
            } catch (e) {
                return { apply: () => null };
            }
        })(),
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            inject: true,
            title: 'React Web Boilerplate',
            template: paths.appTemplate,
            favicon: paths.appFavicon,
            vendorsFilePath: `.cache/${paths.vendorEntryName}.bundle.js`, // TODO: put .cache into paths
        }),
    ]
};
