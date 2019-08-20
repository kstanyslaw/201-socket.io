const socket = io('http://localhost:9000');

socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('messageToServer', { data: 'Data from the client!' });
});

document.querySelector('#message-form').addEventListener('submit',(event) => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer', { text: newMessage });
});

socket.on('messageToClients', (msg) => {
    console.log(msg);
    document.querySelector('#messages').innerHTML += '<li>' + msg.text + '</li>';
});

// socket.on('ping', () => {
//     console.log('PING was recieved from the server.');
// });

// socket.on('pong', (latency) => {
//     console.log(latency);
//     console.log('PONG was sent to the server.');
// });