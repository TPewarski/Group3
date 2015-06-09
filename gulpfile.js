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
        .pipe(gulp.dest('./public'))
});

gulp.task('seedDB', function () {

    var users = [
        { email: 'testing@fsa.com', password: 'testing123' },
        { email: 'joe@fsa.com', password: 'rainbowkicks' },
        { email: 'obama@gmail.com', password: 'potus' }
    ];


    var products = [
        {
            name: "Dire Wolf",
            description: "An unusually large and intelligent species of wolf. Great gift for children of all ages.",
            price: 250000,
            inventoryQuantity: 12,
            categories: ['Animal', 'Dire Wolf'],
            imgPath: "https://kaylahoailinh.files.wordpress.com/2014/10/wallpaper-hd-dire-wolf-hd-cool-7-hd-wallpapers.jpeg?w=726&h=203"
        },

        {
            name: "Petrified Dragon Egg",
            description: " The only remnant of an ancient race long thought extinct. Rumor has it that eggs have begun hatching in the East.",
            price: 50000000,
            inventoryQuantity: 1,
            categories: ['Animal', 'Dragon',],
            imgPath: "http://thedilettantista.files.wordpress.com/2012/04/dsc04357.jpg"
        },
        {
            name: "Valyrian Steel Sword",
            description: "A blade forged in the days of the mighty Valyrian Freehold. It is exceptionally sharp and tremondously strong, yet light, keeping its edge and requiring no maintenance.",
            price: 1250000,
            inventoryQuantity: 3,
            categories: ['Weapon', 'Sword'],
            imgPath: "data:image/jpeg;base64,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"
        },


    ]


    var dbConnected = require('./server/db');

    return dbConnected.then(function () {
        var User = require('mongoose').model('User');
        var Product = require('mongoose').model('Product')
        return Product.create(products).then(function(){return User.create(users)})
        
    }).then(function () {
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