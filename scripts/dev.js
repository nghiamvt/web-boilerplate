const paths = require('../configs/paths');
const packageJSON = require(paths.packageJSON);

function prepareToBuild() {
	console.log('Object.keys(packageJSON.dependencies)', Object.keys(packageJSON.dependencies));
}


prepareToBuild();
