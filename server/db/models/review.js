'use strict'

var mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	date: {type: Date, default: Date.now},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	comment: {type: String, required: true},
	rating: {type: Number, required: true}

})

var Review = mongoose.model('Review', reviewSchema);

