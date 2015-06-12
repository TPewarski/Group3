'use strict';
var router = require('express').Router();
module.exports = router;
var orderModel = require('mongoose').model('Product');

router.get('/', function(req, res){
    orderModel.find(req.query).exec().then(function(data){
        res.send(data)
    }, function(err){
        res.send(err)
    })
});

router.get('/:id', function(req, res){
    orderModel.findById(req.params.id).exec().then(function(data){
        res.send(data)
    }, function(err){
        res.send(err)
    })
});

router.post('/', function(req, res){
    var order = req.body;
    orderModel.create(order).then(function(createdProduct){
        res.send(createdProduct);
    }, function(err){
        res.status(500).send(err.message);
    });
});

router.put('/:id', function(req, res){
    orderModel.update({_id: req.params.id}, req.body);
});