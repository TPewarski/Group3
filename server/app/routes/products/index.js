'use strict';
var router = require('express').Router();
module.exports = router;
var productModel = require('mongoose').model('Product');

router.get('/', function(req, res){
    productModel.find(req.query).exec().then(function(data){
        res.send(data)
    }, function(err){
        res.send(err)
    })
});

router.get('/:id', function(req, res){
    productModel.findById(req.params.id).exec().then(function(data){
        res.send(data)
    }, function(err){
        res.send(err)
    })
});

router.post('/', function(req, res){
    var product = req.body;
    productModel.create(product).then(function(createdProduct){
        res.send(createdProduct);
    }, function(err){
        res.status(500).send(err.message);
    });
});

router.put('/:id', function(req, res){
    productModel.update({_id: req.params.id}, req.body);
});