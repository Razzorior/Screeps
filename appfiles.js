
var fs = require('fs');
var path = require('path');
var process = require("process");
// const appFolder = '.\\app';
const appFolder = '.\\dist';

module.exports = {
    getSources: function () {
        const result = {};
        // const files = fs.readdirSync(appFolder);
        const files = this.getFilesRecursive(appFolder);
        files.forEach(function (file, index) {
            file
            const fileWithoutJs = file.replace('.js', '');
            const filePath = appFolder + '\\' + file;
            result[fileWithoutJs] = fs.readFileSync(filePath, 'utf8');
        });
        return result;
    },
    getFilesRecursive: function (fileOrFolder) {
        var self = this;
        var result = [];
        fs.stat(fileOrFolder, function (err, stat) {
            if (stat && stat.isDirectory()) {
                fs.readdirSync(fileOrFolder).forEach(function (subItem, index) {
                    result = result.concat(
                        self.getFilesRecursive(subItem));
                });
            } else {
                result.push(fileOrFolder);
            }
        });
        return result;
    }
}