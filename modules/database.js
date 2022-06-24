let mysql = require('mysql');
const log = require('perfect-logger');
let configs = require('../configs/configurations');

const databaseConfig = {
    host: configs.database.host,
    user: configs.database.username,
    password: configs.database.password,
    database: configs.database.database
};

function timeSpent(start) {
    let duration = new Date() - start;
    return duration/1000 + 's';
}

let connection = mysql.createConnection(databaseConfig);

connection.connectedToDatabase = false;

function reconnectTimeout() {
    connection.end();
    setTimeout(function () {
        reconnect();
    }, 5 * 1000);
}

function reconnect() {
    let databaseConnectionTime = new Date();
    connection.destroy();
    connection = mysql.createConnection(databaseConfig);
    connection.connect(function(err) {
        if (err){
            connection.connectedToDatabase = false;
            log.crit('Unable to connect to the database after ' + timeSpent(databaseConnectionTime), err);
            reconnectTimeout();
        }else{
            log.info(`Connected to the database {${databaseConfig.database}} in ${timeSpent(databaseConnectionTime)}`);
            connection.connectedToDatabase = true;
        }
    });
}

connection.on('error', function(err) {
    log.crit('Error occurred in the database connection ', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        log.info('Attempting to reconnect to the database');
        reconnect(true);
    }
});

reconnect();

module.exports = connection;