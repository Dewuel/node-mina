const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cluster = require('cluster')
const numCPUs = require('os').cpus.length;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const houseRouter = require('./routes/house')

const app = express();

if(cluster.isMaster){
  console.log(`主进程${process.pid} 正在运行`)

  for(let i = 0; i < numCPUs; i++){
    cluster.fork()
    console.log(i)
  }

  cluster.on('exit', (work, code, signal) => {
    console.log(`工作进程 ${work.process.pid} is exit`)
  })
} else {
  console.log(`工作进程${process.pid}已启动`)
}


require('./socket/chat')(app)
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
app.use('/house', houseRouter)

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
