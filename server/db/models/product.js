'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true,
        default: 0.00
    },
    inventoryQuantity: {
        type: Number,
        required: true,
        defaut: 0.00
    },
    categories: {
        type: [String]
    },
    imgPath: String
});


mongoose.model('Product', schema);