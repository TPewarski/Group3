'use strict';
var router = require('express').Router();
module.exports = router;
var productModel = require('mongoose').model('Product');

router.get('/', function(req, res){
    console.log("req.query", req.query)
    productModel.find(req.query).exec().then(function(data){
        res.send(data)
    }, function(err){
        console.log("error in find route", err)
        res.send(err)
    })
})
router.get('/allproducts', function (req, res, next) {
   
 
    productModel.find().exec().then(function(data){
    	res.send(data);
    }, function(err){
    	next(err);
    });
    

});

router.get('/:id', function(req, res){
    //console.log(req.params)
    productModel.findById(req.params.id).exec().then(function(data){
        res.send(data)
    }, function(err){
        res.send(err)
    })
})

router.get('/inventoryQuantity', function (req, res, next) {
    var modelParams = {};
    modelParams.name = req.query.name;
 
    productModel.findOne(modelParams).exec().then(function(data){
    	console.log("data", data)
    	console.log("invQuant", data.inventoryQuantity)	
    	res.send(data);
    }, function(err){
    	console.log("error", err)
    	next(err);
    });
    

});