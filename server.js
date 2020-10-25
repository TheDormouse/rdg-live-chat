const http = require('http');
const path = require('path');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});

const io = socketIo(3000);

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})