'use strict';
var router = require('express').Router();
module.exports = router;


router.use('/products', require('./products'));
router.use('/tutorial', require('./tutorial'));
router.use('/members', require('./members'));
router.use('/admin', require('./admin'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
<<<<<<< HEAD

=======
>>>>>>> 38686d94a6442e3db161a194ef1e26da35d5cb48


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});



