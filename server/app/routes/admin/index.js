'use strict';
var router = require('express').Router();
module.exports = router;
var productModel = require('mongoose').model('Product');

//post put remove for each users products and orders. 

router.post('/editpage', function (req, res, next) {
	productModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err, upDate) {
		if(err) return err;
		res.send(upDate);
	});
});


