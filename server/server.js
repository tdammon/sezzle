const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.static('build'));

const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`connected to ${PORT}!`));



let equationsList = []
io.on('connection', socket => {
    socket.on('SEND_EQUATION_TO_SERVER', equation => {
        equationsList = [...equationsList, equation];
        console.log(equationsList, 'working')
        socket.broadcast.emit('SEND_EQUATIONS_TO_USERS', equationsList);
        socket.emit('SEND_EQUATIONS_TO_USERS', equationsList);
      });

    socket.on('GET_EQUATIONS_LIST', () => socket.emit('CURRENT_LIST', equationsList));

    socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          socket.emit( 'timer', new Date() );
        }, interval);
      });


})