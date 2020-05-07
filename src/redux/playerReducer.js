import { socket } from '../index';

const playerReducer = (state = [0],action) => {
    switch (action.type) {

      case 'PUT_ALL_PLAYERS_TO_REDUCER':
        console.log(action, state)
        state = [ ...action.playerList];
        break;
      case 'CURRENT_PLAYER_LIST_TO_REDUCER':
        console.log(action)
        state = [...action.playerList];
        break;
      case 'PUT_NUMBER_TO_REDUCER':
        console.log(action, state)
        state = [action.number];
        break;   
      default:
        console.log(action)
        break;
    }
  
    return state;
  };
  
  export default playerReducer;