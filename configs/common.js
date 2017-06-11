const fs = require('fs');

const removeFolderRecursive = (dir) => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            const curPath = `${dir}/${file}`;
            if (fs.statSync(curPath).isDirectory()) {
                removeFolderRecursive(curPath); // recurse
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dir);
    }
}

module.exports = {
    rmDir: removeFolderRecursive,
}
