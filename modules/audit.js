const logger = require('perfect-logger');
const mysql = require('../modules/database');
const configs = require('../configs/configurations');

exports.category = {
    SYS: 'SYSTEM',
    AUTH: 'AUTH'
}

exports.record = (user, category, message) => {
    const query = "INSERT INTO tblAudit (`epoc`, `dateTime`, `user`, `category`, `message`) VALUES(?, ?, ?, ?, ?);";
    logger.debug('Appending audit record', {user: user, category: category, message: message});
    const epoc = Date.now();
    mysql.query(query,
        [epoc, new Date(epoc).toLocaleString('en-US', { timeZone: configs.logging.timezone }), user, category, message],
        (err, payload) => {
        if (err) {
            logger.warn('Failed to insert new audit record', err);
        }
    })
}