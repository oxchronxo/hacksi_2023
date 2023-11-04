/**
 * routes
 */

const router = require('express').Router();

const routerDependencies = (req, res, next) => {
    // see if there are querystring parameters passed in providing overrides
    // protect incoming variables please
    const pageDataDefaults = {
        b: 2
    };
    const pageDataQuerystring = JSON.parse(req.query.pageData || '{}');
    const pageData = Object.assign({}, pageDataDefaults, pageDataQuerystring);
    req.pageData = JSON.stringify(pageData);
    next();
};

router.use('/status', function(req, res, next) {
    res.render('status');
});
router.use('/keenan', routerDependencies, function(req, res, next) {
    res.render('keenan', {
        pageData: req.pageData
    });
});
router.use('/eric', routerDependencies, function(req, res, next) {
    res.render('eric', {
        pageData: req.pageData
    });
});
router.use('/', routerDependencies, function(req, res, next) {
    res.render('default', {
        pageData: req.pageData
    });
});

module.exports = router;
