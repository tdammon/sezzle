const express = require('express');
require('dotenv').config();
const app = express();
// const app = require('express')();

app.use(express.static('build'));

const server = require('http').Server(express);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`connected to ${PORT}!`));



let equationsList = []
io.on('connection', socket => {
    socket.on('SEND_EQUATION_TO_SERVER', equation => {
        equationsList = [...equationsList, equation];
        console.log(equationsList, 'working')
        socket.emit('SEND_EQUATIONS_TO_USERS', equationsList);
      });

    socket.on('GET_EQUATIONS_LIST', () => socket.emit('CURRENT_LIST', equationsList));


})