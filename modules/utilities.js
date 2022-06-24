const express = require('express');
exports.extractRequestData = function (req) {
    try {
        return {
            timestamp: Date.now(),
            rawHeaders: req.rawHeaders,
            httpVersion: req.httpVersion,
            method: req.method,
            remoteAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            remoteFamily: req.socket.remoteFamily,
            url: req.url,
            body: req.body
        };
    } catch (e) {
        return {};
    }


}