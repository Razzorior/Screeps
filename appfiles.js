
var fs = require('fs');
var path = require('path');
var process = require("process");
// const appFolder = '.\\app';
const appFolder = '.\\dist';

module.exports = {
    getSources: function () {
        const result = {};
        const files = fs.readdirSync(appFolder);
        files.forEach(function (file, index) {
            const fileWithoutJs = file.replace('.js', '');
            const filePath = appFolder + '\\' + file;
            result[fileWithoutJs] = fs.readFileSync(filePath, 'utf8');
        });
        return result;
    }
}