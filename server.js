

const express = require('express');


const PORT = process.env.PORT;
const INDEX = '/index.html';

const server = express()

server.listen(PORT, () => console.log(`Listening on ${PORT}`))

server.use(express.static("public"))

server.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

var io = require('socket.io').listen(PORT);

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