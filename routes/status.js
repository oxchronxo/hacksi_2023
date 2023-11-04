const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.render('status', {
        layout: false
    });
});

module.exports = router;
