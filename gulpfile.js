'use strict';

// All used modules.
var babel = require('gulp-babel');
var gulp = require('gulp');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var karma = require('karma').server;
var bluebird = require('bluebird');

// Development tasks
// --------------------------------------------------------------

// Live reload business.
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('reloadCSS', function () {
    return gulp.src('./public/style.css').pipe(livereload());
});

gulp.task('lintJS', function () {
    return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('buildJS', function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task('testServerJS', function () {
    return gulp.src('./tests/server/**/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('testBrowserJS', function (done) {
    karma.start({
        configFile: __dirname + '/tests/browser/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('buildCSS', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public'));
});

gulp.task('seedDB', function () {

    var users = [
        { email: 'cart@cart.com', password: 'cart' },
        { email: 'joe@fsa.com', password: 'rainbowkicks' },
        { email: 'obama@gmail.com', password: 'potus' },
        { email: 'imanadmin@admins.com', password: 'administrator', isAdmin: true},
        { email: 'a@a.com', password: 'a', isAdmin: true},
        { email: 'u@u.com', password: 'u', isAdmin: false}
    ];


    var products = [
        {
            _id: "111111111111111111111111",
            name: "NEXIUM (Esomeprazole) 40mg",
            description: "ESOMEPRAZOLE prevents the production of acid in the stomach. It is used to treat gastroesophageal reflux disease (GERD), ulcers, certain bacteria in the stomach, and inflammation of the esophagus. It can also be used to prevent ulcers in patients taking medicines called NSAIDs.",
            price: 2.50,
            inventoryQuantity: 3.50,
            categories: ['Heart Burn', 'GERD'],
            imgPath: "http://images.medscape.com/pi/features/drugdirectory/octupdate/ZNC50400.jpg"
        },

        {
            _id: "222222222222222222222222",
            name: "Prozium",
            description: "At the cost of the dizzying highs of human emotion, we have suppressed its abysmal lows. Now we are at peace with ourselves and human kind is one. We are our own conscience now, and it is this conscience that guides us to rate EC-10, for emotional content, all those things that might tempt us to feel, again.",
            price: 42,
            inventoryQuantity: 999,
            categories: ['Anti-depressants', 'Anti-psychotic',],
            imgPath: "http://i.imgur.com/Y4d3ClC.jpg"
        },
        {
            name: "Celebrex 200mg",
            description: "CELEBREX® (celecoxib) is FDA approved to treat the signs and symptoms of osteoarthritis (OA) and rheumatoid arthritis (RA), and for the management of acute pain in adults. It is a type of NSAID — a prescription-strength nonsteroidal anti-inflammatory drug. Prescription CELEBREX has been an arthritis treatment option for millions of patients for over 15 straight years. CELEBREX is not a narcotic.",
            price: 100,
            inventoryQuantity: 85678,
            categories: ['Anti-inflammatory', 'NSAID'],
            imgPath: "http://images.ddccdn.com/images/pills/nlm/000251525.jpg"
        },
        {
            name: "Melange 100mg",
            description: "The spice must flow.",
            price: 1000000,
            inventoryQuantity: 999999,
            categories: ['Psychotic', 'Longevity'],
            imgPath: "http://steve-lovelace.com/wordpress/wp-content/uploads/2012/04/atreides-brand-spice-melange.jpg"
        },
        {
            name: "NZT-48",
            description: "You know how people only use 10% of their brains? Well, this drug allows you to use 100% of your brain.",
            price: 40.35,
            inventoryQuantity: 10000,
            categories: ['Psychotic'],
            imgPath: "http://i.ytimg.com/vi/QS5WG5MsX-E/hqdefault.jpg"
        },



    ]


    var dbConnected = require('./server/db');
    var User = require('mongoose').model('User');
    var Product = require('mongoose').model('Product');
    var Order = require('mongoose').model('Order');

    return dbConnected
        .then(function () {
            return User.find({}).remove().exec();
        })
        .then(function(){
            return Product.find({}).remove().exec();
        })
        .then(function(){
            return Order.find({}).remove().exec();
        })
        .then(function(){
            return User.create(users);
        })
        .then(function(){
            return Product.create(products);
        })
        .then(function(){

            return User.findOne({email: "cart@cart.com" }, function(err, obj){
                if(err) console.log("HUCKING FELL!!! ---->", err);



                return Order.create({ //CREATE ORDER HERE, LINKED TO THE USER cart
                    user: obj._id,
                    cart: [{
                        name: "Viagra",
                        price: 2.00,
                        quantity: 100
                    },{
                        name: "Ibuprofen",
                        price: 5.00,
                        quantity: 420  
                    }]
                }).then(function(){
                    //LINK UP THE ORDER ABOVE WITH THE USER cart@cart.com here
                });
            }).exec();
        })
        // .then(function(){

        //     return User.findOne({email: "cart@cart.com" }, function(err, obj){
        //         if(err) console.log("FUCKING HELL!!! ---->", err);
        //         return Order.create({
        //             user: obj._id,
        //             cart: [{
        //                 name: "Viagra",
        //                 price: 2.00,
        //                 quantity: 100
        //             },{
        //                 name: "Ibuprofen",
        //                 price: 5.00,
        //                 quantity: 420  
        //             }]
        //         });
        //     }).exec();
        // })
        .then(function () {
            console.log("USE 'a@a.com' PASSWORD 'a' for admin account. USE 'u@u.com' PASSWORD 'u' FOR PLEBIAN");

            process.kill(0);
        }).catch(function (err) {
            console.error(err);
        });

});

// --------------------------------------------------------------

// Production tasks
// --------------------------------------------------------------

gulp.task('buildCSSProduction', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public'))
});

gulp.task('buildJSProduction', function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildProduction', ['buildCSSProduction', 'buildJSProduction']);

// --------------------------------------------------------------

// Composed tasks
// --------------------------------------------------------------

gulp.task('build', function () {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'buildCSSProduction']);
    } else {
        runSeq(['lintJS', 'buildJS', 'buildCSS']);
    }
});

gulp.task('default', function () {

    livereload.listen();
    gulp.start('build');

    gulp.watch('browser/js/**', function () {
        runSeq('buildJS', ['testBrowserJS', 'reload']);
    });

    gulp.watch('browser/scss/**', function () {
        runSeq('buildCSS', 'reloadCSS');
    });

    gulp.watch('server/**/*.js', ['lintJS']);
    gulp.watch(['browser/**/*.html', 'server/app/views/*.html'], ['reload']);
    gulp.watch(['tests/server/**/*.js', 'server/**/*.js'], ['testServerJS']);
    gulp.watch('tests/browser/**/*', ['testBrowserJS']);

});
