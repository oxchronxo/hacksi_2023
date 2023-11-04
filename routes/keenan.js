const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.render('keenan', {
        customParam: req.customParam
    });
});

module.exports = router;
