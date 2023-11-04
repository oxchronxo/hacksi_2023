const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const cors = require('cors');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';

// app creation
const app = express();

// view engine setup
app.engine('hbs', handlebars.create({extname: 'hbs', defaultLayout: 'main'}).engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware
const routerDependencies = (req, res, next) => {
    // see if there are querystring parameters passed in providing overrides
    const {
        vms,
        pms
    } = req.query;
    // use a customParam to pass data down to views by attaching to the request
    // req.customParam = vms || {};
    next();
};

app.use('/status*', require('./routes/status'));
app.use('/', routerDependencies, require('./routes/index'));
app.use('/keenan', routerDependencies, require('./routes/keenan'));
app.use('/eric', routerDependencies, require('./routes/eric'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, req.path));
});

// error handler
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    res.status(status);
    res.render('error', {
        layout: false,
        status: status,
        error: isProduction ? {} : err,
    });
});

module.exports = app;
