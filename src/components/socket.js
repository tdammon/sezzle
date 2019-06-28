import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const configureSocket = dispatch => {
  
  socket.on('connect', () => {
    console.log('connected');
  });
  socket.on('UPDATED_EQUATION_LIST', state => {
    dispatch({ type: 'DELIVER_UPDATED_EQUATIONS_TO_REDUCER', updatedEquations: state });
  });
  return socket;
};

// the following are fucntions that our client side uses
// to emit actions to everyone connected to our web socket
export const getCurrentEquations = () => socket.emit('GET_CURRENT_EQUATIONS');

export const sendEquationToServer = equation =>
  socket.emit('SEND_EQUATION_TO_SERVER', equation);

export default configureSocket;