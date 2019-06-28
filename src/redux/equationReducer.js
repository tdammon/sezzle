import { socket } from '../index';

const equationReducer = (state = [],action) => {
  switch (action.type) {
    case 'ADD_EQUATION':
      console.log('adding equation')
      state = [ ...state, action.payload.equation +' = '+ action.payload.solution];
      console.log(state)
      socket && socket.emit('UPDATE_EQUATIONS_LIST', state);
      break;
    default:
      break;
  }

  return state;
};

export default equationReducer;