let express = require('express');
let path = require('path');
let favicon = require('static-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let routes = require('./routes/index');
let getdataRouter = require('./routes/getdata');
let gettokenRouter = require('./routes/gettoken');
let getmailhashRouter = require('./routes/getmailhash');
let sendmailRouter = require('./routes/sendmail');
let createaccountRouter = require('./routes/createaccount');
let loginRouter = require('./routes/login');
let getmemberRouter = require('./routes/getmember');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', getdataRouter);
app.use('/', gettokenRouter);
app.use('/', getmailhashRouter);
app.use('/', sendmailRouter);
app.use('/', createaccountRouter);
app.use('/', loginRouter);
app.use('/', getmemberRouter);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
