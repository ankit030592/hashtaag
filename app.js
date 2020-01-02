const compression = require('compression')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const frameguard = require('frameguard');
const logger = require('morgan');
const config = require('config');
const mongoskin = require('mongoskin');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const dbName = 'hashtaag';
const dbUser = 'hashtaag';
const dbPassword = 'hashtaag';


const env_name = process.env.NODE_ENV;

console.log(process.env.NODE_ENV);
// var connection_str = 'mongodb://@localhost:27017/places';
if (env_name == 'development') {
    connection_str = `mongodb://${dbUser}:${dbPassword}@localhost:27017/${dbName}`;
}

global.db = mongoskin.db(connection_str);
global.mongoskin = require('mongoskin');

db.bind('places');

const index = require('./routes/index');
const district = require('./routes/districts.server.routes');
const state = require('./routes/states.server.routes');
const town = require('./routes/towns.server.routes');

// const state = require('./routes/department.server.routes');


app.disable('etag');

app.use(frameguard({
    action: 'deny'
}));

app.use(cookieParser());

//Handle cors
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', express.static(path.resolve(__dirname, 'dist')));



app.use('/', index);
app.use('/district', district);
app.use('/state', state);
app.use('/town', town);

// app.use('/state', state);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(compression({
    filter: shouldCompress
}))

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;