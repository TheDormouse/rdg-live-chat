const express = require("express");
const app = express();
const http = require('http').createServer(app)
const socket = require("socket.io")(http)

// App setup
const PORT = 5500;


// Static files
app.use(express.static("public"));


// Socket setup
const io = socket(server);

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