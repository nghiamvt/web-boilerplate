const path = require('path');
const webpack = require('webpack');
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
	devtool: isProduction ? 'source-map' : 'inline-source-map',
	entry: [
		'babel-polyfill',
		'whatwg-fetch',
		paths.mainEntry,
		!isProduction && `webpack-dev-server/client?http://${process.env.HOST}:${process.env.PORT}`,
	].filter(Boolean),
	output: {
		path: paths.appDist, // not used in dev
		// Add /* filename */ comments to generated require()s in the output.
		pathinfo: !isProduction,
		// dev use “in-memory” files
		filename: paths.appBundle,
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
				// only the first matching Rule is used when the Rule matches.
				oneOf: [
					// "url" loader works like "file" loader except that it embeds assets
					// smaller than specified limit in bytes as data URLs to avoid requests.
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'images/[name].[hash:8].[ext]',
						},
					},
					// Process JS with Babel.
					{
						test: /\.(js|jsx)$/,
						include: paths.appSrc,
						loader: 'babel-loader',
						options: {
							// This is a feature of `babel-loader` for webpack (not Babel itself).
							// It enables caching results in ./node_modules/.cache/babel-loader/
							// directory for faster rebuilds.
							cacheDirectory: true,
						},
					},
					// "postcss" loader applies autoprefixer to our CSS.
					// "css" loader resolves paths in CSS and adds assets as dependencies.
					// "style" loader turns CSS into JS modules that inject <style> tags.
					// In production, we use a plugin to extract that CSS to a file, but
					// in development "style" loader enables hot editing of CSS.
					{
						test: /\.scss$/,
						use: ExtractTextPlugin.extract({ // @TODO review for webpack 4
							fallback: 'style-loader',
							use: [
								{
									loader: 'css-loader',
									options: {
										importLoaders: 2,
										minimize: isProduction,
										sourceMap: !isProduction,
									},
								},
								{
									loader: 'postcss-loader',
									options: {
										ident: 'postcss',
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
									loader: 'sass-loader',
									options: {
										sourceMap: !isProduction,
									},
								},
							],
						}),
					},
					// "file" loader makes sure those assets get served by WebpackDevServer.
					// When you `import` an asset, you get its (virtual) filename.
					// In production, they would get copied to the `build` folder.
					// This loader doesn't use a "test" so it will catch all modules
					// that fall through the other loaders.
					{
						// Exclude `js` files to keep "css" loader working as it injects
						// its runtime that would otherwise processed through "file" loader.
						// Also exclude `html` and `json` extensions so they get processed
						// by webpacks internal loaders.
						exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
						loader: 'file-loader',
						options: {
							name: 'files/[name].[hash:8].[ext]',
						},
					},
				],
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
		!isProduction && new webpack.NamedModulesPlugin(),
		isProduction && new webpack.optimize.UglifyJsPlugin(),
		isProduction && new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css|scss)$/,
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
		child_process: 'empty',
	},
};
