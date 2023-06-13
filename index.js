const express = require('express');
const cors = require('cors');
var indexRouter = require('./routes/index');
var etage1 = require('./routes/etage1');
var etage5 = require('./routes/etage5');
var app = express();
var i18n = require('./i18n');
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(i18n);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/etage1', etage1);
app.use('/etage5', etage5);

app.use((req, res, next) => {
  if (req.secure) {
    // If the request is already using HTTPS, no need to redirect
    next();
  } else {
    // Redirect HTTP requests to HTTPS
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

app.get('/setLanguage/:lang', (req, res) => {
  const lang = req.params.lang;
  res.cookie('lang', lang); // Store selected language in a cookie
  req.setLocale(lang); // Set the language for the current request
  res.redirect('back'); // Redirect the user back to the previous page
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(process.env.PORT || 3000);


module.exports = app;
