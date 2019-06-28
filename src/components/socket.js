import io from 'socket.io-client';

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

  socket.on('CURRENT_LIST', equationsList =>
    dispatch({ type: 'CURRENT_LIST_TO_REDUCER', equationsList: equationsList })
  );

  return socket;
};

// the following are fucntions that our client side uses
// to emit actions to everyone connected to our web socket
export const getCurrentEquations = () => socket.emit('GET_EQUATIONS_LIST');

export const sendEquationToServer = equation =>
  socket.emit('SEND_EQUATION_TO_SERVER', equation);
  

export default configureSocket;