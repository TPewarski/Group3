<<<<<<< HEAD
'use strict';
=======
>>>>>>> 38686d94a6442e3db161a194ef1e26da35d5cb48
var router = require('express').Router();
module.exports = router;
var orderModel = require('mongoose').model('Order');

router.get('/', function(req, res){
<<<<<<< HEAD
    orderModel.find(req.query).populate('user').exec().then(function(data){
        res.send(data)
    }, function(err){
        res.send(err)
    })
});

router.get('/:id', function(req, res){
    orderModel.findById(req.params.id).populate('user').exec().then(function(data){
=======
    orderModel.find(req.query).exec().then(function(data){
        res.send(data)
    }, function(err){
        console.log("error in find route", err)
        res.send(err)
    })
})

router.get('/:id', function(req, res){
    orderModel.findById(req.params.id).exec().then(function(data){
>>>>>>> 38686d94a6442e3db161a194ef1e26da35d5cb48
        res.send(data)
    }, function(err){
        res.send(err)
    })
<<<<<<< HEAD
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
=======
})
>>>>>>> 38686d94a6442e3db161a194ef1e26da35d5cb48
