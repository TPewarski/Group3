var router = require('express').Router();
module.exports = router;
var userModel = require('mongoose').model('User');

router.get('/', function(req, res){
    userModel.find(req.query).populate('cart').exec().then(function(data){
        res.send(data);
    }, function(err){
        res.status(500).send(err.message);
    });
});

router.get('/:id', function(req, res){
    userModel.findById(req.params.id).populate('cart').exec().then(function(data){
        res.send(data);
    }, function(err){
        res.status(500).send(err.message);
    });
});

router.post('/', function(req, res){
    var user = req.body;
    userModel.create(user).then(function(createdProduct){
        res.send(createdProduct);
    }, function(err){
        res.status(500).send(err.message);
    });
});

router.put('/', function(req, res){
    userModel.findById(req.body._id, function(err, user) {
        if(err) return res.status(500).send(err.message);

        user.isAdmin = req.body.isAdmin || user.isAdmin;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.cart = req.body.cart || user.cart;
        user.save(function(err, user){
            if(err) return err;
            res.send(user);
        });
    });
});

router.delete('/:id', function(req, res){
    console.log("req.paramsy", req.params);
    userModel.remove({_id: req.params.id}, function(err){

        if(err) res.status(500).send(err);
        res.send("Success!");
    });
});
