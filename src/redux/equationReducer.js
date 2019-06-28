import { socket } from '../index';

const equationReducer = (state = [],action) => {
  switch (action.type) {
    case 'ADD_EQUATION':
      console.log(action)
      state = [ ...state, action.payload.equation +' = '+ action.payload.solution];
      socket && socket.emit('UPDATE_EQUATION_LIST', state);
      break;
    default:
      break;
  }

  return state;
};

export default equationReducer;