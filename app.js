var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const config = require("./config");

var indexRouter = require('./routes/index');
var AssociatesRouter = require('./routes/associateRouter');
var companyRouter = require("./routes/companyRouter");
var orderRouter = require("./routes/orderRouter");
var setupRouter = require("./routes/setupRouter");
const uploadRouter = require('./routes/uploadRouter');

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Companies = require("./models/companies");
const Associates = require("./models/associates");

//Connection URL
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
    /*options*/
});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => {
    console.log("ERROR: ", err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/associates', AssociatesRouter);
app.use('/companies', companyRouter);
app.use('/orders', orderRouter);
app.use('/setup', setupRouter);
app.use('/imageUpload', uploadRouter);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;