const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);
app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     next();
   });
const io = new Server(server, {
     cors: {
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST'],
     },
});

io.on('connection', (socket) => {
console.log(socket.id);
socket.emit('connected')

socket.on('disconnect', () => {
     socket.leaveAll();
     console.log("left")
})

socket.on('join_room', (data) => {
     socket.leaveAll();
     console.log('left')
     socket.join(data);
     console.log(`joined ${data}`)
});
socket.on('leave', (data) => {
     socket.leaveAll();
     console.log(`left room ${data.room}`)
     socket.to(data).emit('left', data)
     socket.leave(data)
});

socket.on('send_message', (data) => {
          socket.to(data.room).emit('receive_message', data);

     // socket.to(data.room).emit('receive_message', data);
     console.log(data)
});

//CONN ROOM
socket.on('connected_room', (data) => {
     socket.join(data);
});

socket.on('user_connected', (data) => {
     console.log(`${data.name} connected to ${data.room}`)
     socket.to(data.room).emit('connect_message', data)
})


// socket.on('send_message', (data) => {
//      socket.to(data.room).emit('recived_message', data)
// });
});



server.listen(8000, () => console.log('server started'));











// const webSocketServerPort = 8000;
// const webSocketServer = require('websocket').server;
// const http = require('http');

// const server = http.createServer();
// server.listen(webSocketServerPort);
// console.log('server started');

// const wsServer = new webSocketServer({
//      httpServer: server
// });

// const client = {};

// wsServer.on('request', (request) =>{
//     var userID = getUni
// });