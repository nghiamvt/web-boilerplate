const Webpack = require("webpack");
const WebpackDevServer = require('webpack-dev-server');
// const webpackConfig = require("../configs/webpack.dev");
const webpackConfig = require("../configs/webpack.prod");
const paths = require("../configs/paths");

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    stats: {
        colors: true
    }
});

server.listen(paths.port, paths.host, function() {
    console.log("Starting server on http://" + paths.host + ":" + paths.port + "/");
});
