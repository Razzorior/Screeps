
var fs = require('fs');
var path = require('path');
var process = require("process");
// const appFolder = '.\\app';
const appFolder = '.\\dist';

export class AppFiles {
    public static getSources() {
        const result = {};
        // const files = fs.readdirSync(appFolder);
        const files = AppFiles.getFilesRecursive(appFolder);
        files.forEach(function (file, index) {
            file
            const fileWithoutJs = file.replace('.js', '');
            const filePath = appFolder + '\\' + file;
            result[fileWithoutJs] = fs.readFileSync(filePath, 'utf8');
        });
        return result;
    }

    private static getFilesRecursive(fileOrFolder): string[] {
        var result = [];
        fs.stat(fileOrFolder, function (err, stat) {
            if (stat && stat.isDirectory()) {
                fs.readdirSync(fileOrFolder).forEach(function (subItem) {
                    result = result.concat(
                        AppFiles.getFilesRecursive(subItem));
                });
            } else {
                result.push(fileOrFolder);
            }
        });
        return result;
    }
}