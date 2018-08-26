const fs = require('fs');
const path = require('path');

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
};

const isDirEmpty = (dirname) => {
  try {
    return !fs.readdirSync(dirname).length;
  } catch (e) {
    return true;
  }
};

const createFolderRecursive = (dir) => {
  dir.split(path.sep).reduce((currentPath, folder) => {
    const newPath = currentPath + folder + path.sep;
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }
    return newPath;
  }, '');
};

const copyFileToDir = (file, dir) => {
  fs.writeFileSync(path.join(dir, path.basename(file)), fs.readFileSync(file));
};

module.exports = {
  rmDir: removeFolderRecursive,
  mkDir: createFolderRecursive,
  isDirEmpty,
};
