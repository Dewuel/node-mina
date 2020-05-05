let isInitiator;
const room = prompt('Enter room name')

const socket = io.connect();

if(room !== ''){
  console.log('Join room' + room)
  socket.emit('create or join', room)
}

socket.on('full', room => {
  console.log('Room' + room + 'is empty')
})

socket.on('empty', root => {
  isInitiator = true;
  console.log(`Room ${room} is empty`)
})

socket.on('join', room => {
  console.log(`Making request to join room ${room}`)
})

socket.on('log', array => {
  console.log.apply(console, array)
})