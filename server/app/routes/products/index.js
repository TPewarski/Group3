'use strict';
var router = require('express').Router();
module.exports = router;


router.get('/allproducts', function (req, res, next) {
   
    var productModel = require(__dirname + "../../../../db/models/product.js");
 
    productModel.find().exec().then(function(data){
    	res.send(data);
    }, function(err){
    	next(err);
    });
    

});