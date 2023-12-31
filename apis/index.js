const router = require('express').Router();

const routerDependencies = (req, res, next) => {
    // see if there are querystring parameters passed in providing overrides
    const {
        customParam
    } = req.query;
    // use a customParam to pass data down to views by attaching to the request
    req.customParam = customParam || {};
    req.env = process.env.NODE_ENV;
    next();
};

router.use('/', routerDependencies, (req, res) => res.send('api'));

module.exports = router;
