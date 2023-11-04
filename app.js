/**
 * app
 */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const cors = require('cors');

// app creation
const app = express();

// view engine
app.engine('hbs', handlebars.create({extname: 'hbs', defaultLayout: false}).engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/', require('./routes'));
app.use('/api', require('./apis'));

// error handling
app.use(require('./middleware/errors'));

module.exports = app;
