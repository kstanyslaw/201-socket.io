const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(__dirname + '/public/'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);
io.on('connect', (socket) => {
    socket.emit('messageFromServer', { data: 'Successfuly connect the server!' });
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient);
    });
    socket.on('newMessageToServer', (msg) => {
        // console.log(msg);
        io.emit('messageToClients', { text: msg.text });
    })
});

io.of('/admin').on('connect', (socket) => {
    console.log('Connect to admin namespace');
    io.of('/admin').emit('welcome', 'Wellcome to the admin channel!');
});