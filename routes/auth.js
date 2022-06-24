const express = require('express');
const router = express.Router();
const logger = require('perfect-logger');
const bcrypt = require('bcrypt');
const mysql = require('../modules/database');
const configs = require('../configs/configurations')
const audit = require('../modules/audit');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const STR_ERR_INVALID_CREDENTIALS = 'Invalid username credentials';
const privateKey = fs.readFileSync(configs.security.auth.privateKey);

async function findUser(emailAddress) {
    logger.debug(`Looking up for user: {${emailAddress}}`);
    return new Promise((resolve, reject)=> {
        const query = "SELECT * FROM `tblUsers` WHERE `email` = ?";
        mysql.query(query, [emailAddress], (err, payload) => {
            if (err) {
                logger.crit('Failed to search users in the database', err);
                reject(err);
            } else {
                resolve(payload);
            }
        });
    })
}

router.post('/authenticate', async (req, res) => {
    const result = await findUser(req.body.email);
    if (result.length > 0) {
        const user = result[0];
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            audit.record(user.email, audit.category.AUTH, `Authentication success.`)
            const jwtPayload = {
                email: user.email,
                fullName: user.name
            };
            const token = jwt.sign(jwtPayload, privateKey, {
                algorithm: 'RS256',
                expiresIn: configs.security.auth.expiresIn
            });
            res.status(200).json({
                userInfo: jwtPayload,
                token: token
            });
            return;
        }
    }
    await bcrypt.compare(req.body.password, '***********');
    audit.record(req.body.email, audit.category.AUTH, `Authentication failed.`)
    res.status(401).json({ error: STR_ERR_INVALID_CREDENTIALS });
});


module.exports = router;