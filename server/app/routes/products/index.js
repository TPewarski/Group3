'use strict';
var router = require('express').Router();
module.exports = router;
var productModel = require('mongoose').model('Product');

router.get('/', function(req, res){
    productModel.find(req.query).exec().then(function(data){
        res.send(data);
    }, function(err){
        console.log("error in find route", err);
        res.send(err);
    });
});

router.get('/:id', function(req, res){
    console.log("req.params.id", req.params.id);

    productModel.findById(req.params.id).exec().then(function(data){
        res.send(data);
    }, function(err){
        res.send(err);
    });
});

