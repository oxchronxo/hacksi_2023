const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.render('default', {
        customParam: req.customParam
    });
});

module.exports = router;
