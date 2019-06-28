import { socket } from '../index';

const equationReducer = (state = [],action) => {
  switch (action.type) {
    // case 'ADD_EQUATION':
    //   console.log('adding equation')
    //   state = [ ...state, action.payload.equation +' = '+ action.payload.solution];
    //   console.log(state)
    //   socket && socket.emit('UPDATE_EQUATIONS_LIST', state);
    //   break;
    case 'DELIVER_UPDATED_EQUATIONS_TO_REDUCER':
      // when the equations list is updated by other users
      // this is called so that the app's state reflects the current equations list
      console.log('deliver',action)
      state = [ ...state, action.updatedEquations ];
      break;  
    case 'PUT_ALL_EQUATIONS_TO_REDUCER':
      // put all of the equations to the reducer
      console.log('putting equations to reducer', action)
      state = [ ...action.equationList ];
      break;  
    case 'CURRENT_LIST_TO_REDUCER':
      // when the api call to the server is returned successfuly
      // this is called so that the app's state reflects the current list value
      state = [action.equationList];
      break;  
    default:
      break;
  }

  return state;
};

export default equationReducer;