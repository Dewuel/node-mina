const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
server.listen(3001)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

io.on('connection', socket => {
  socket.emit('news', {hello: 'world'})
  console.log("socket 链接 socketid=", socket.id)

  socket.on('message', data => {
    console.log(data)
  })

  socket.on('private message', (from, msg) => {
    console.log('I received a private message By' + from+'saying+' + msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnect')
  })
})

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
