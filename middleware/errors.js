/**
 * errors
 */

const router = require('express').Router();
const createError = require('http-errors');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';

router.use('*', function(req, res, next) {
    next(createError(404, req.baseUrl));
});

// error handler
router.use(function (err, req, res, next) {
  // render the error page
    const status = err.status || 500;
    res.status(status);
    res.render('error', {
        status: status,
        error: isProduction ? {} : err
    });
});

module.exports = router;
