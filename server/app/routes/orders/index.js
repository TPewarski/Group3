'use strict';
var router = require('express').Router();
module.exports = router;
var orderModel = require('mongoose').model('Order');

router.get('/', function(req, res){
    orderModel.find(req.query).populate('user').exec().then(function(data){
        res.send(data);
    }, function(err){
        res.status(500).send(err.message);
    })
});

router.get('/:id', function(req, res){
    orderModel.findById(req.params.id).populate('user').exec().then(function(data){
        res.send(data);
    }, function(err){
        res.status(500).send(err.message);
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


//WHEN CREATING AN ORDER, HOW TO POPULATE AND FILL IT RIGHT AFTER PLACING PRODUCT ID's IN?

router.put('/:id', function(req, res){
    orderModel.update({_id: req.params.id}, req.body);
});