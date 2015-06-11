var router = require('express').Router();
module.exports = router;
var userModel = require('mongoose').model('User');

router.get('/', function(req, res){
    userModel.find(req.query).exec().then(function(data){
        res.send(data)
    }, function(err){
        console.log("error in find route", err)
        res.send(err)
    })
})

router.get('/:id', function(req, res){
    userModel.findById(req.params.id).exec().then(function(data){
        res.send(data)
    }, function(err){
        res.send(err)
    })
})
