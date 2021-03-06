const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require('body-parser');
const indexRouter = require("./routes/index");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.text());

app.use("/", indexRouter);

app.use(function (req, res, next) {
  res.statusCode=404;
  res.end();
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  console.log(err);
  res.json({code:500});
});

module.exports = app;
