const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.render('eric', {
        layout: false,
        customParam: req.customParam
    });
});

module.exports = router;
