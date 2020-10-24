const socket = io.connect('https://127.0.0.1:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

var name = prompt('Enter your name')
appendMessage("You connected")
socket.emit('new-user', name)

socket.on('chat-message', data =>{
    appendMessage( `${data.name}: ${data.message}`)
})

socket.on('user-connected', name =>{
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name =>{
    appendMessage(`${name} disconnected`)
})

socket.on('null-user', name =>{
    window.location.replace("index.html")
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    const createNew = document.createElement('div')
    createNew.innerText = `You: ${message} `
    messageContainer.append(createNew)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
  }
