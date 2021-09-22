const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Routes
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');
// const usersRouter = require('./routes/users');

const app = express();

// DB Connection
//mongoose.connect('mongodb://localhost:27017/surf-shop');
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.eevsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useCreateIndex: true
}).then(()=>{
  console.log('Succesfully connected!');
}).catch((err)=>{
  console.log('Error while trying to connect', err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Se usa el extended:true para poder enviar datos en el formulario de la forma obj[attr]
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Configure passport and sessions
// Se deben configurar las sesiones antes del passport
app.use(session({
  secret: 'hello daddy hello mom!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());  // lo que se envía como parámetro se obtiene del passport-local-mongoose que se definió en el model User
passport.deserializeUser(User.deserializeUser());

// Mount Routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);
// app.use('/users', usersRouter);

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
