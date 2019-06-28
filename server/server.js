const app = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);


server.listen(process.env.PORT || 8000, () => console.log('connected to port 8000!'));



let equationsList = []
io.on('connection', socket => {
    socket.on('UPDATE_EQUATIONS_LIST', state => {
        equationsList = state.equationsList;
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