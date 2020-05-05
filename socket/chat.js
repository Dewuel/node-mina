module.exports = app => {
  const server = require('http').createServer(app)
  const io = require('socket.io')(server)
  server.listen(3001)

  io.sockets.on('connection', socket => {
    function log(){
      const array = ['>>>Message from server:'];
      for(let item of arguments){
        array.push(item)
      }
      socket.emit('log', array)
    }

    socket.on('create or join', room => {
      const clientInRoom = io.sockets.adapter.rooms[room];
      const numClients = clientInRoom ? Object.keys(clientInRoom.sockets).length : 0;
      log(`Room ${room} has ${numClients} client(s)`)
      log(`Request to create or join room ${room}`)

      if(numClients === 0){
        socket.join(room);
        socket.emit('created', room)
      } else if(numClients === 1){
        io.sockets.in(room).emit('join', room);
        socket.join(room)
        socket.emit('joined', room)
      } else {
        socket.client('full', room)
      }

      socket.emit(`emit(): client ${socket.id} join room ${room}`)

      socket.broadcast.emit(`broadcast(): client ${socket.id} joined room ${room}`)
    })
  })
};
