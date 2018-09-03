const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');
const envConfig = require('./.env');
const webpackVendorCfg = require('./webpack.vendor');

module.exports = ({ devMode } = {}) => {
  return {
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? 'cheap-module-source-map' : 'source-map',
    entry: [
      'babel-polyfill',
      'whatwg-fetch',
      paths.mainEntry,
    ],
    output: {
      filename: paths.appBundle,
      // dev use “in-memory” files
      path: paths.appDist,
      publicPath: paths.publicPath,
    },
    resolve: {
      alias: { '@': paths.appSrc },
      extensions: ['.js', '.json', '.jsx'],
      modules: [paths.appSrc, 'node_modules'],
    },
    module: {
      rules: [
        {
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
              options: {
                limit: 10000, // bytes
                name: paths.IMG_FILENAME_LOADER,
              },
            },
            // Process JS with Babel.
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { importLoaders: 1, sourceMap: devMode } },

                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({ // React doesn't support IE8 anyway
                        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                        flexbox: 'no-2009',
                      }),
                    ],
                    sourceMap: devMode,
                  },
                },
                { loader: 'sass-loader', options: { sourceMap: devMode } },
              ],
            },
            {
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: paths.FILENAME_LOADER,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin(envConfig),
      ...Object.keys(webpackVendorCfg.entry).map((e) => {
        const manifestFile = path.join(paths.appDist, paths.DLL_MANIFEST_FILENAME.replace(/\[name\]/g, e));
        return new webpack.DllReferencePlugin({
          // context: paths.appRoot,
          manifest: fs.existsSync(manifestFile) ? require(manifestFile) : '',
        });
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        favicon: paths.appFavicon,
        env: envConfig,
        dll: {
          paths: Object.keys(webpackVendorCfg.entry).map((e) => {
            return `${paths.publicPath}/${paths.DLL_FILENAME.replace(/\[name\]/g, e)}`.replace('/', '');
          }),
        },
      }),
      devMode && new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: paths.CSS_FILENAME_LOADER,
      }),
    ].filter(Boolean),
  };
};
