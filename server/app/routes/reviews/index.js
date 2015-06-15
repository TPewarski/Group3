'use strict';
var router = require('express').Router();
module.exports = router;
var reviewModel = require('mongoose').model('Review');

router.get('/', function(req, res){
	reviewModel.find(req.query).exec().then(function(data){
		res.send(data);
	}, function(err){
		res.send(err)
	})
})

router.get('/:id', function(req, res){
	reviewModel.findById(req.params.id).exec().then(function(data){
        res.send(data);
    }, function(err){
        res.send(err);
    });
})

router.post('/', function(req, res){
    var review = req.body;
    reviewModel.create(review).then(function(createdreview){
        res.send(createdreview);
    }, function(err){
        res.status(500).send(err.message);
    });
});

