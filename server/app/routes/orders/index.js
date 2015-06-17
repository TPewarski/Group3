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

router.put('/', function(req, res){
    orderModel.findById(req.body._id, function(err, order){
        order.isShipped = req.body.isShipped || order.isShipped;
        order.isClosed =req.body.isClosed || order.isClosed;
        order.save(function(err, user){
            if(err) res.status(500).send(err);
            res.send(user)
        });
    });
    
});