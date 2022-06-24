const authMiddleware = require('../middleware/auth-middleware');
const express = require('express');
const router = express.Router();
const mysql = require('../modules/database');
const logger = require("perfect-logger");

// Authentication and Verification Middleware
router.use('/', authMiddleware());
router.get('/list', function (req, res) {
    logger.debug('Fetching statistics from the database');
    const query = "SELECT * FROM tblStatistics;"
    mysql.query(query, (err, payload) => {
        if (err) {
            logger.crit('Failed to fetch statistics from the database', err);
            res.status(500).send({});
            return;
        }
        res.send(payload);
    })

});

module.exports = router;