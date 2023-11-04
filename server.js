/**
 * server
 */

// set our debug flag
process.env.DEBUG = 'Fehrenbachers';
// check if we are in test mode
const isTest = process.env.TEST ? true : false;

const fs = require('fs');
const http = require('http');
const https = require('https');
const debug = require('debug')(process.env.DEBUG);

// load our app
const app = require('./app');

isTest && debug('Test');

const serverPort = isTest ? 4080 : 4443;
const server = isTest ? http.createServer(app) : https.createServer({
    key: fs.readFileSync('secrets/key.pem'),
    cert: fs.readFileSync('secrets/cert.pem'),
}, app);
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

if (isTest) {
    module.exports = server;
}
