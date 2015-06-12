'use strict';

var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: [{
        //This object inside of cart[] is an identical copy of product.
        //It is being kept separate to maintain historical data. So
        //as prices fluctuate via admin control panel, the old order prices
        //will not change. 
            name: { //Name of the product.
                type: String,
                required: true
            },
            price: {
                type: Number,
                default: 999999999.99
            },
            quantity: {
                type: Number, default: 0
            }
        }],
    isClosed: {type: Boolean, default: false},
    isPaid: {type: Boolean, default: false},
    isShipped: {type: Boolean, default: false}
});


var Order = mongoose.model('Order', orderSchema);


// orderSchema.virtual('products.total').get(function(){
//     Order.find().populate().exec(function(err,????){
//     })
//     return this.products.reduce(function(prev, curr){
//         return this.price
//     }, 0);
// })






