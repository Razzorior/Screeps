import { AppFiles } from "./appfiles";

var login = require('./login');

var https = require('https');

var email = login.email,
    password = login.password,
    data = {
        branch: 'default',
        modules: AppFiles.getSources()
    };

var req = https.request({
    hostname: 'screeps.com',
    port: 443,
    path: '/api/user/code',
    method: 'POST',
    auth: email + ':' + password,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

var body = JSON.stringify(data);
req.write(JSON.stringify(data));
req.end();
console.log('pushed');