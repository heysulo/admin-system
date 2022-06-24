const _ = require('lodash');
const log = require('perfect-logger');
const mysql = require('../modules/database.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const configs = require("../configs/configurations");

const publicKey = fs.readFileSync(configs.security.auth.publicKey);

module.exports = function() {
    return function(req, res, next) {
        if (!req.header('Authorization')) {
            log.threat('JWT missing', log.getRequestData(req))
            res.status(401).send({
                error: {
                    message: 'Misisng JWT'
                }
            });
            return;
        }

        let authTokens = req.header('Authorization').split(' ');
        if (authTokens.length !== 2) {
            log.threat('Malformed JWT received', log.getRequestData(req))
            res.status(401).send({
                error: {
                    message: 'Invalid JWT'
                }
            });
            return;
        }

        jwt.verify(authTokens[1], publicKey, {algorithm: 'RS256'}, function (err, decoded) {
            if (err) {
                if (err.name !== 'TokenExpiredError')
                {
                    log.threat('JWT verification failed', {err: err, req: log.getRequestData(req)})
                }
                res.status(401).send({
                    error: {
                        message: 'JWT TokenExpiredError'
                    }
                });
            } else {
                req.userdata = decoded;
                next();
            }
        });
    }
};