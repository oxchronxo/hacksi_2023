const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.render('keenan', {
        layout: false,
        customParam: req.customParam
    });
});

module.exports = router;
