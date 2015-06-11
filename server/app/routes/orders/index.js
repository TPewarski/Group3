var router = require('express').Router();
module.exports = router;
var orderModel = require('mongoose').model('Order');

router.get('/', function(req, res){
    orderModel.find(req.query).exec().then(function(data){
        res.send(data)
    }, function(err){
        console.log("error in find route", err)
        res.send(err)
    })
})

router.get('/:id', function(req, res){
    orderModel.findById(req.params.id).exec().then(function(data){
        res.send(data)
    }, function(err){
        res.send(err)
    })
})
