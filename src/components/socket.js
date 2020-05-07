import io from 'socket.io-client';

// const socket = io();
const socket = io('http://localhost:8000');

const configureSocket = dispatch => {
  
  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('UPDATED_LIST', state => {
      console.log('test')
    dispatch({ type: 'DELIVER_UPDATED_EQUATIONS_TO_REDUCER', updatedEquations: state });
  });

  socket.on('SEND_EQUATIONS_TO_USERS', equationList => {
      console.log('sending equations to users', equationList)
    dispatch({ type: 'PUT_ALL_EQUATIONS_TO_REDUCER', equationList })
  });

  socket.on('CURRENT_LIST', equationsList => {
      console.log('getting info')
    dispatch({ type: 'CURRENT_LIST_TO_REDUCER', equationsList: equationsList })
  });

  socket.on('CURRENT_PLAYER_LIST', playerList => {
    dispatch({ type: 'CURRENT_PLAYER_LIST_TO_REDUCER', playerList: playerList})
  })

  socket.on('CURRENT_COLOR_LIST', colorsList => {
    dispatch({ type: 'CURRENT_COLOR_LIST_TO_REDUCER', colorsList: colorsList})
  })

  socket.on('SEND_PLAYERS_TO_USERS', playerList => {
      console.log('sending players to users', playerList)
    dispatch({ type: 'PUT_ALL_PLAYERS_TO_REDUCER', playerList})  
  })

  socket.on('SEND_COLORS_TO_USERS', colorsList => {
    console.log('sending players to users', colorsList)
  dispatch({ type: 'PUT_ALL_COLORS_TO_REDUCER', colorsList})  
})

  

  return socket;
};

// the following are fucntions that our client side uses
// to emit actions to everyone connected to our web socket
export const getCurrentEquations = () => socket.emit('GET_EQUATIONS_LIST');

export const getCurrentPlayers = () => socket.emit('GET_PLAYERS_LIST');

export const getCurrentColors = () => socket.emit('GET_COLORS_LIST');

export const sendEquationToServer = equation =>
  socket.emit('SEND_EQUATION_TO_SERVER', equation);
  
export const sendNewPlayerToServer = player =>
  socket.emit('SEND_NEW_PLAYER_TO_SERVER', player)  

export default configureSocket;