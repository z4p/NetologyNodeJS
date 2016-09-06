"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8000;


http.listen(PORT, () => {
    console.log('HTTP server started on port %d', PORT);
});

app.get('/', (req, res) => {
    res.sendfile('./index.html');
});

io.use((socket, next) => {
    socket.nickname = 'Anonym';
    
    socket.on('rename', data => {
        console.log(`User ${socket.nickname} changed his name to ${data.name}`);
        socket.nickname = data.name;
        
        socket.broadcast.emit('new_user', {
            name: socket.nickname,
        });
    });
    
    socket.on('msg', data => {
        io.sockets.emit('msg', {
            from: socket.nickname,
            text: data.text,
            time: (new Date()).toTimeString(),
        });
        console.log(`User ${socket.nickname} send message "${data.text}"`);
    });
    
    socket.on('disconnect', () => {
        console.log(`User ${socket.nickname} disconnected`);
    });
    
    next();
});

io.on('connection', (socket) => {
    console.log('New user connected');
});
