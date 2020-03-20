var config = require('config');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');
const dotenv = require('dotenv');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');

dotenv.config({path: './config/config.env'});

//Connect to mongoDB
connectDB();

//Route files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var authRouter = require('./routes/auth');
var trackRouter = require('./routes/tracks');
var videoRouter = require('./routes/videos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Prevent XSS threat
app.use(helmet());
app.use(xssClean());

//Sanitize data
app.use(sanitize());

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tracks', trackRouter);
app.use('/api/v1/videos', videoRouter);

app.use(errorHandler);

module.exports = app;
