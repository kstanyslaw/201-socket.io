const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(__dirname + '/public/'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);
io.on('connection', (socket) => {
    socket.emit('messageFromServer', { data: 'Successfuly connect the server!' });
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient);
    });
    // socket.on('newMessageToServer', (msg) => {
    //     // console.log(msg);
    //     io.emit('messageToClients', { text: msg.text });
    // })

    socket.join('level1');
    io.of('/').to('level1').emit('joined', `${socket.id} says I have joined the LEVEL1 room`);

});

io.of('/admin').on('connection', (socket) => {
    console.log('Someone Connected to ADMIN namespace');
    io.of('/admin').emit('welcome', 'Welcome to the admin channel!');
})