const fs = require('fs');
const crypto = require('crypto');
const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const {
	choosePort,
	createCompiler,
	prepareProxy,
	prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const paths = require('../configs/paths');
const env = require('../configs/.env');

const packageJSON = require(paths.packageJSON);


function buildVendors() {
	const jsonStr = JSON.stringify({
		dependencies: packageJSON.dependencies ? packageJSON.dependencies : null,
		devDependencies: packageJSON.devDependencies ? packageJSON.devDependencies : null,
	});
	// create md5 hash from a string
	const currentHash = crypto.createHash('md5').update(JSON.stringify(jsonStr)).digest('hex');

	let rebuildVendors = true;
	try {
		if (fs.existsSync(paths.HASH_FILE_PATH) && fs.existsSync(paths.appDist)) {
			const prevHash = fs.readFileSync(paths.HASH_FILE_PATH, 'utf8');
			rebuildVendors = (prevHash !== currentHash);
		}
	} catch (err) {
		console.info(chalk.red('[ERR] read hash file.\n'));
		console.error(err);
		rebuildVendors = true;
	}

	const webpackVendorCfg = require(paths.WEBPACK_VENDOR_CONFIG);
	return new Promise((resolve, reject) => {
		if (rebuildVendors) {
			console.info(chalk.cyan('Rebuilding vendor dll...'));
			webpack(webpackVendorCfg).run((err) => {
				if (err) {
					console.info(chalk.red('[ERR] build webpack vendor.\n'));
					reject(err);
				}
				fs.writeFileSync(paths.HASH_FILE_PATH, currentHash, 'utf-8');
				resolve();
			});
		} else {
			console.info(chalk.gray('Reuse vendor dll...'));
			resolve();
		}
	});
}

function startDevServer() {
	return new Promise((resolve, reject) => {
		const protocol = env.HTTPS ? 'https' : 'http';
		const urls = prepareUrls(protocol, env.HOST, env.PORT);

		const webpackCfg = require(paths.WEBPACK_CONFIG)({ mode: 'development' });
		const devServerCfg = require(paths.DEV_SERVER_CONFIG);
		WebpackDevServer.addDevServerEntrypoints(webpackCfg, devServerCfg);
		const compiler = webpack(webpackCfg);
		const devServer = new WebpackDevServer(compiler, devServerCfg);
		devServer.listen(env.PORT, env.HOST, (err) => {
			if (err) {
				console.info(chalk.red('[ERR] failed to start dev server.\n'));
				reject(err);
			}
			if (process.stdout.isTTY) {
				clearConsole();
			}
			console.info(chalk.cyan('Starting the development server...\n'));
			openBrowser(urls.localUrlForBrowser);
			resolve();
		});

		['SIGINT', 'SIGTERM'].forEach((sig) => {
			process.on(sig, () => {
				devServer.close();
				process.exit();
			});
		});
	});
}

buildVendors()
	.then(startDevServer)
	.catch((err) => {
		console.info(chalk.red('Failed to compile.\n'));
		console.error(err);
		process.exit(1);
	});
