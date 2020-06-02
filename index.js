const path = require('path');
const express = require('express');
const SocketIo = require('socket.io');
const app = express();

//seteo el puerto asignado segun el SO, sino el 3000
app.set('port', process.env.PORT || 4000);

//envio de static files
app.use(express.static(path.join(__dirname, 'public',)));

//le digo q use el puerto configurado
const server = app.listen(app.get('port'), ()=>{
    console.log('corriendo en puerto:', app.get('port'));
});

const io = SocketIo(server);

//websocket
io.on('connection', (socket) =>{
    console.log('socket conectado', socket.id);

    socket.on('chat:message', (data) =>{
        console.log(data);
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    });
}); 