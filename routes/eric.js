const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.render('eric', {
        customParam: req.customParam
    });
});

module.exports = router;
