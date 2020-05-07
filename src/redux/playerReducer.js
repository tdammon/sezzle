import { socket } from '../index';

const playerReducer = (state = [],action) => {
    switch (action.type) {

      case 'PUT_ALL_PLAYERS_TO_REDUCER':
        console.log(action, state)
        state = [ ...action.playerList];
        break;
      case 'CURRENT_PLAYER_LIST_TO_REDUCER':
        console.log(action)
        state = [...action.playerList];
        break;
      default:
        console.log(action)
        break;
    }
  
    return state;
  };
  
  export default playerReducer;