'use strict';

var path = require('path');
var mongoose = require('mongoose');



var User = require('mongoose').model('User');


var orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: [{
            name: { //Name of the product.
                type: String,
                required: true
            },
            price: {
                type: Number,
                default: 1.99
            },
            quantity: {
                type: Number, default: 0
            },
            imgPath: {
                type: String
            }
        }],
    isClosed: {type: Boolean, default: false},
    isPaid: {type: Boolean, default: false},
    isShipped: {type: Boolean, default: false},
    dateClosed: { type:Date, default: Date.now },
    datePaid: { type:Date },
    dateShipped: { type:Date }
});

orderSchema.post('save', function(doc){
var email = require(path.join(__dirname, '../../app/configure/email-service/index.js'));
        var userID = doc.user;
        User.findOne({_id:userID}, function(err, man){
            email(man.email, 'order-confirm');
        })


});

var Order = mongoose.model('Order', orderSchema);

