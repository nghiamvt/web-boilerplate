const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const paths = require('./paths');
const envConfig = require('./.env.js');

module.exports = (env, argv) => {
	const devMode = argv.mode !== 'production';
	return {
		devtool: devMode ? 'cheap-module-source-map' : 'source-map',
		devServer: {
			// hot: true,
			contentBase: paths.appDist,
		},
		entry: [
			'babel-polyfill',
			'whatwg-fetch',
			paths.mainEntry,
		],
		output: {
			filename: 'app.[hash:8].js',
			// dev use “in-memory” files
			path: paths.appDist,
			publicPath: paths.publicPath,
		},
		resolve: {
			alias: { '@': paths.appSrc },
			extensions: ['.js', '.json', '.jsx'],
			modules: ['node_modules'],
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
								name: 'images/[name].[hash:8].[ext]',
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
								name: 'static/media/[name].[hash:8].[ext]',
							},
						},
					],
				},
			],
		},
		plugins: [
			// new ProgressBarPlugin(),
			new webpack.EnvironmentPlugin(envConfig),
			new CleanWebpackPlugin([paths.appDist], {
				allowExternal: true,
				verbose: false, // logs
			}),
			new HtmlWebpackPlugin({
				inject: true,
				template: paths.appHtml,
				favicon: paths.appFavicon,
				env: envConfig,
			}),
			// new webpack.HotModuleReplacementPlugin(),
			new MiniCssExtractPlugin({
				filename: devMode ? '[name].css' : '[name].[hash:8].css',
			}),
		],
	};
};
