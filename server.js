// default our env to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const http = require('http');
const https = require('https');
const fs = require('fs');
const debug = require('debug')('hacksi');

// load our app
const app = require('./app');

// check if our env is production
const isProduction = process.env.NODE_ENV === 'production';
// check if we are in test mode
const isTest = process.env.TEST ? true : false;

debug('isProduction', isProduction);
debug('isTest', isTest);

let serverPort = 4080;
let server = http.createServer(app);
if (!isProduction && !isTest) {
    serverPort = 4443;
    server = https.createServer({
        key: fs.readFileSync('secrets/key.pem'),
        cert: fs.readFileSync('secrets/cert.pem'),
    }, app);
}
server.on('close', () => {
    debug('Server connection closed');
});
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof serverPort === 'string' ? 'Pipe ' + serverPort : 'Port ' + serverPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});
server.listen(serverPort, () => {
    debug('Listening on Port ' + serverPort);
    debug('Ctrl + C to Stop');
});

if (process.env.TEST) {
    debug('Test', true);
    module.exports = server;
}
