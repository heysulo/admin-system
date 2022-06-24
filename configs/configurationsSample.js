const _ = require('lodash');
exports.database = {
    host : 'localhost',
    username : '',
    password : '',
    database : ''
};

exports.http = {
    httpPort: 3000,
    httpsPort: 443,
    ssl: {
        key: '',
        cert: '',
        ca: ''
    }
};

exports.security = {
    auth: {
        privateKey: 'keys/key.pem',
        publicKey: 'keys/pubkey.pem',
        expiresIn: 60*15
    }
}

exports.operational = {
    production: false,
    domain: 'newnop.local'
};

exports.logging = {
    logLevelFile: 0,
    developmentMode: !exports.operational.production,
    timezone: 'Asia/Colombo',
    logDirectory: 'logs/'
}

let stdJson = _.cloneDeep(exports)
stdJson.database.password = '*********';

console.log(JSON.stringify(stdJson, null, 2));
