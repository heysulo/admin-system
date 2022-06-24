let log = require('perfect-logger');
const configs = require('./configs/configurations');
const utilities = require('./modules/utilities');

log.initialize('NewNopWebSystem', configs.logging);
log.addStatusCode('threat', 'THREAT', 0)
log.getRequestData = utilities.extractRequestData;

const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const fs = require('fs');
const audit = require('./modules/audit');

if (configs.operational.production) {
    audit.record('SYSTEM', audit.category.SYS, 'Server Started');
}

log.info(`Server initializing in ${configs.operational.production ? 'Production' : 'Development'} mode`);
log.debug(`Hostname: ${os.hostname()}`);

// Setup Express
const http = require('http').Server(app);

http.listen(configs.http.httpPort, function(){
    log.info(`HTTP Service started and listening on PORT ${configs.http.httpPort}`);
});

if (configs.operational.production){
    const https = require('https').Server({
        key: fs.readFileSync(configs.http.ssl.key, 'utf8'),
        cert: fs.readFileSync(configs.http.ssl.cert, 'utf8'),
        ca: fs.readFileSync(configs.http.ssl.ca, 'utf8')
    }, app);

    https.listen(configs.http.httpsPort, function(){
        log.info(`HTTPS Service started and listening on PORT ${configs.http.httpsPort}`);
    });
}

app.use(require('body-parser').json());

// Static Files
app.use('/public',express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    if (configs.operational.production && (!req.secure || req.headers.host !== `www.${configs.operational.domain}`)){
        res.writeHead(302, {
            'Location': `https://www.${configs.operational.domain}/`
        });
        res.end();
        return;
    }
    res.render('admin/index.ejs');
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/administration'));
app.use('/statistics', require('./routes/statistics'));