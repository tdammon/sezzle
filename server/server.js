const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.static('build'));

const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`connected to ${PORT}!`));



let equationsList = []
let playerList =[]
let colorsList= {red:{x:0, y:0},blue:{x:0, y:0},green:{x:0, y:0},purple:{x:0, y:0},pink:{x:0, y:0},black:{x:0, y:0},grey:{x:0, y:0},yellow:{x:0, y:0}}
io.on('connection', socket => {
    socket.on('SEND_EQUATION_TO_SERVER', equation => {
        equationsList = [equation, ...equationsList];
        console.log(equationsList, 'working')
        socket.broadcast.emit('SEND_EQUATIONS_TO_USERS', equationsList);
        socket.emit('SEND_EQUATIONS_TO_USERS', equationsList);
    });

    socket.on('SEND_NEW_PLAYER_TO_SERVER', player => {
      console.log(player, 'player')
      // playerList = [{name:player.name, piece:player.piece, position:player.position}, ...playerList];
      colorsList = {...colorsList, ...player }
      console.log(colorsList)
      // console.log(playerList, 'working')
      // socket.broadcast.emit('SEND_PLAYERS_TO_USERS', playerList);
      socket.broadcast.emit('SEND_COLORS_TO_USERS', colorsList)
      // socket.emit('SEND_PLAYERS_TO_USERS', playerList)
      socket.emit('SEND_COLORS_TO_USERS', colorsList)
    })

    socket.on('SEND_NEW_NUMBER_TO_SERVER', number => {
      console.log(number, 'number')
      socket.broadcast.emit('SEND_NUMBER_TO_USERS', number)
      socket.emit('SEND_NUMBER_TO_USERS', number)
    })

    socket.on('SEND_RESET_TO_SERVER', () => {
      socket.broadcast.emit('SEND_RESET')
      socket.emit('SEND_RESET')
    })

    socket.on('GET_COLORS_LIST', () => socket.emit('CURRENT_COLOR_LIST', colorsList));

    socket.on('GET_PLAYERS_LIST', () => socket.emit('CURRENT_PLAYER_LIST', playerList));

    socket.on('GET_EQUATIONS_LIST', () => socket.emit('CURRENT_LIST', equationsList));

    socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          socket.emit( 'timer', new Date() );
        }, interval);
      });


})