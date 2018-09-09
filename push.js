try {
    var login = require('./login');
    var files = require('./appfiles');

    var https = require('https');

    var sources = files.getSources();
    if (sources.length < 2) {
        throw "too few files";
    }

    var email = login.email,
        password = login.password,
        data = {
            branch: 'default',
            modules: sources
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
} catch (err) {
    console.log('pushing failed');
}