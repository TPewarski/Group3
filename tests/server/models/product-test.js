var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/product');

var Product = mongoose.model('Product');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    describe('product creation', function () {

        describe('on creation', function () {
            var createProduct = function () {
                return Product.create({ name: 'Prozium', description: 'Don\'t inject this into your neck.', price: 300.99, inventoryQuantity: 300, categories:['the downer', 'Tetragrammaton']});
            };

            it('should create a product called Prozium that costs $301, with 300 in store.', function(done){
                createProduct().then(function(){
                        Product.findOne({name:'Prozium'}, function(err, object){
                        expect(object).to.have.property('name', 'Prozium');
                        expect(object).to.have.property('price', 300.99);
                        expect(object).to.have.property('inventoryQuantity', 300);
                        done();
                    })
                })
            })

        });

    });

});
