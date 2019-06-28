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
    socket.on('UPDATE_EQUATIONS_LIST', state => {
        equationsList = state;
        socket.broadcast.emit('UPDATED_LIST', state);
      });

    socket.on('GET_EQUATIONS_LIST', () => socket.emit('CURRENT_LIST', equationsList));

    socket.on('subscribeToTimer', (interval) => {
      console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
        socket.emit( 'timer', new Date() );
      }, interval);
    });
})