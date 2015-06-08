'use strict';

var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Product'
        },
        quantity: {
            type: Number
        }
    }]

});


var Order = mongoose.model('Order', orderSchema);


// orderSchema.virtual('products.total').get(function(){
//     Order.find().populate().exec(function(err,????){
//     })
//     return this.products.reduce(function(prev, curr){
//         return this.price
//     }, 0);
// })






