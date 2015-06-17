'use strict';

var mongoose = require('mongoose');

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

// orderSchema.post('save', function(doc){
//     console.log('%s has been saved', 
//         Product.find


//         );
// })

var Order = mongoose.model('Order', orderSchema);


// orderSchema.virtual('products.total').get(function(){
//     Order.find().populate().exec(function(err,????){
//     })
//     return this.products.reduce(function(prev, curr){
//         return this.price
//     }, 0);
// })






