const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const paths = require('./paths');
const envConfig = require('./.env');
const webpackVendorCfg = require('./webpack.vendor');

module.exports = ({ devMode } = {}) => {
  return {
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? 'cheap-module-source-map' : 'source-map',
    entry: ['babel-polyfill', paths.mainEntry],
    output: {
      filename: paths.appBundle,
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: paths.chunkFilename,
      // dev use “in-memory” files
      path: paths.appDist,
      publicPath: paths.publicPath,
    },
    resolve: {
      alias: { '@': paths.appSrc },
      extensions: ['.js', '.json', '.jsx', '.scss'],
      modules: [paths.appSrc, 'node_modules'],
    },
    module: {
      strictExportPresence: true,
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },

        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                formatter: 'react-dev-utils/eslintFormatter',
                eslintPath: 'eslint',
                emitWarning: true,
              },
              loader: 'eslint-loader',
            },
          ],
          include: paths.appSrc,
        },
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
                {
                  loader: 'css-loader',
                  options: { importLoaders: 3, sourceMap: devMode },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      require('postcss-preset-env')({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                    ],
                    sourceMap: devMode,
                  },
                },
                {
                  loader: 'resolve-url-loader',
                },
                { loader: 'sass-loader', options: { sourceMap: devMode } },
              ],
            },
            {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: '@svgr/webpack',
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
      ...Object.keys(webpackVendorCfg.entry).map(e => {
        const manifestFile = path.join(
          paths.appDist,
          paths.DLL_MANIFEST_FILENAME.replace(/\[name\]/g, e),
        );
        return new webpack.DllReferencePlugin({
          // context: paths.appRoot,
          manifest: fs.existsSync(manifestFile) ? require(manifestFile) : '', // eslint-disable-line
        });
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        favicon: paths.appFavicon,
        env: envConfig,
        dll: {
          paths: Object.keys(webpackVendorCfg.entry).map(e => {
            return `${paths.publicPath}/${paths.DLL_FILENAME.replace(
              /\[name\]/g,
              e,
            )}`.replace('/', '');
          }),
        },
        minify: devMode
          ? {}
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
      }),
      devMode && new webpack.HotModuleReplacementPlugin(),
      !devMode &&
        new MiniCssExtractPlugin({
          filename: paths.CSS_FILENAME_LOADER,
        }),
      // new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    optimization: devMode
      ? {}
      : {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                parse: {
                  ecma: 8,
                },
                compress: {
                  ecma: 5,
                  warnings: false,
                  comparisons: false,
                  inline: 2,
                },
                mangle: {
                  safari10: true,
                },
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              },
              parallel: true,
              cache: true,
              sourceMap: devMode,
            }),
            new OptimizeCSSAssetsPlugin({
              cssProcessorOptions: {
                parser: safePostCssParser,
                map: devMode
                  ? {
                      inline: false,
                      annotation: true,
                    }
                  : false,
              },
            }),
          ],
          // Automatically split vendor and commons
          // https://twitter.com/wSokra/status/969633336732905474
          // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
          splitChunks: {
            chunks: 'all',
            name: false,
          },
          // Keep the runtime chunk seperated to enable long term caching
          // https://twitter.com/wSokra/status/969679223278505985
          runtimeChunk: true,
        },
  };
};
