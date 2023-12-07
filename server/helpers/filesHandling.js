const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const deleteFile = promisify(fs.unlink);

module.exports = {
  readFile,
  deleteFile
};