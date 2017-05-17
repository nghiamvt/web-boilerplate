const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "source-map",
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules
    target: "web",
    entry: [
        // activate HMR for React
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        require.resolve('./polyfills'),
        paths.mainEntry
    ],
    output: {
        // This is the JS bundle containing code from all our entry points, and the Webpack runtime.
        // We are not actually outputting any files when running the workflow,
        // but we want these “in-memory” files to be fetched from the same path as in production,
        // Ex: <script src="/static/js/bundle.js"></script>
        filename: "static/js/bundle.js",
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
        (() => {
            try {
                return new webpack.DllReferencePlugin({
                    context: '.',
                    manifest: JSON.parse(fs.readFileSync(path.join(paths.appCache, 'vendors-manifest.json'), 'utf-8')),
                });
            } catch (e) {
                // handle no vendors
                return { apply: () => null };
            }
        })(),
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            inject: true,
            title: 'React Web Boilerplate',
            template: paths.appTemplate,
            favicon: paths.appFavicon,
        }),
    ]
};
