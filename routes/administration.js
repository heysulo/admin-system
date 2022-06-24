const authMiddleware = require('../middleware/auth-middleware');
const express = require('express');
const router = express.Router();

// Authentication and Verification Middleware
router.use('/', authMiddleware());
router.get('/test', function (req, res) {
    res.send({})
});

module.exports = router;