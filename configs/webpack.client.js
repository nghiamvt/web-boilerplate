const path = require('path');
const webpack = require('webpack');
const jeet = require('jeet');
const koutoSwiss = require('kouto-swiss');
const autoprefixer = require('autoprefixer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CompressionPlugin = require('compression-webpack-plugin');

const paths = require('./paths');
const getClientEnvironment = require('./env');

const env = getClientEnvironment();
const isProduction = process.env.NODE_ENV === 'production';
const webpackVendorCfg = require('./webpack.vendor')({ isProduction });

module.exports = {
	devtool: 'source-map',
	target: 'web',
	entry: [
		'babel-polyfill',
		'whatwg-fetch',
		paths.mainEntry,
		!isProduction && `webpack-dev-server/client?http://${process.env.HOST}:${process.env.PORT}`,
	].filter(Boolean),
	output: {
		path: paths.appDist, // not used in dev
		pathinfo: !isProduction,
		// dev use “in-memory” files
		filename: paths.appBundle,
		publicPath: paths.publicPath,
	},
	resolve: {
		extensions: ['.js', '.json'],
		modules: [
			'node_modules',
			paths.appSrc,
		],
	},
	module: {
		rules: [
			// "file" loader makes sure those assets end up in the `build` folder.
			// When you `import` an asset, you get its filename.
			{
				exclude: [/\.html$/, /\.(js|jsx)$/, /\.styl$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: 'file-loader',
				options: {
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
			// "url" loader works just like "file" loader but it also embeds
			// assets smaller than specified size as data URLs to avoid requests.
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
			{
				test: /\.js?$/,
				include: paths.appSrc,
				loaders: 'babel-loader',
				options: {
					cacheDirectory: true,
				},
			},
			{
				test: /\.styl$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: isProduction,
								sourceMap: !isProduction,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [
									require('postcss-flexbugs-fixes'),
									autoprefixer({
										browsers: [
											'>1%',
											'last 4 versions',
											'Firefox ESR',
											'not ie < 9', // React doesn't support IE8 anyway
										],
										flexbox: 'no-2009',
									}),
								],
								sourceMap: !isProduction,
							},
						},
						{
							loader: 'stylus-loader',
							options: {
								use: [jeet(), koutoSwiss()],
								sourceMap: !isProduction,
							},
						},
					],
				}),
			},
		],
	},
	plugins: [
		// Makes some environment variables available to the JS code
		new InterpolateHtmlPlugin(env.raw),
		new ProgressBarPlugin(),
		new ExtractTextPlugin(paths.CSS_FILE),
		new webpack.DefinePlugin(env.stringified),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		...Object.keys(webpackVendorCfg.entry).map((e) => {
			const root = isProduction ? paths.appDist : paths.appDev;
			return new webpack.DllReferencePlugin({
				context: '.',
				manifest: require(path.join(root, paths.DLL_MANIFEST_FILE.replace(/\[name\]/g, e))),
			});
		}),
		// https://github.com/jantimon/html-webpack-plugin
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
			// `dll` is our self-defined option to pass the paths of the built dll files
			// to the HTML template. The dll JavaScript files are loaded in <script> tags
			// within the template to be made available to the application.
			dll: {
				paths: Object.keys(webpackVendorCfg.entry).map((e) => {
					return `${paths.publicPath}/${paths.DLL_FILE.replace(/\[name\]/g, e)}`.replace('//', '/');
				}),
			},
		}),
		new webpack.NamedModulesPlugin(),
		isProduction && new webpack.optimize.UglifyJsPlugin(),
		isProduction && new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css)$/,
			threshold: 10240,
			minRatio: 0.8,
		}),
	].filter(Boolean),
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
	},
};
