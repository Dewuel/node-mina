module.exports = app => {
  const server = require('http').createServer(app)
  const io = require('socket.io')(server)
  server.listen(3001)

  // io.on('connection', socket => {
  //   socket.emit('news', { hello: 'world' })
  //   console.log("socket 链接 socketid=", socket.id)

  //   socket.on('message', data => {
  //     console.log(data)
  //   })

  //   socket.on('private message', (from, msg) => {
  //     console.log('I received a private message By' + from + 'saying+' + msg)
  //   })

  //   socket.on('disconnect', () => {
  //     console.log('user disconnect')
  //   })
  // })
  // const chat = io.of('/chat')
  //   .on('connection', socket => {
  //     socket.emit('a message', {
  //       that: 'only',
  //       '/chat': 'will get'
  //     });
  //     chat.emit('a message', {
  //       everyone: 'in',
  //       '/chat': 'will get'
  //     });
  //   });

  // const news = io.of('/news')
  //   .on('connection', socket => {
  //     socket.emit('item', {news: 'item'});
  //   });

  // io.on('connection', socket => {
  //   const tweets = setInterval(() => {
  //     getBieberTweet(tweet => {
  //       socket.volatile.emit('bieber tweet', tweet);
  //     }, 100)
  //   });

  //   socket.on('disconnect', () => {
  //     clearInterval(tweets)
  //   })
  // })

  io.on('connection', socket => {
    socket.on('message', (id, msg) => {
      socket.broadcast.to(id).emit('my message', msg)
    })
  })
};
