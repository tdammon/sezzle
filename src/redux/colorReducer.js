import { socket } from '../index';

const colorReducer = (state = [{red:{x:0, y:0},blue:{x:0, y:0},green:{x:0, y:0},purple:{x:0, y:0},pink:{x:0, y:0},black:{x:0, y:0},grey:{x:0, y:0},yellow:{x:0, y:0},brown:{x:0,y:0},turquoise:{x:0,y:0}}],action) => {
  switch (action.type) {

    case 'CURRENT_COLOR_LIST_TO_REDUCER':
      console.log(action, state)
      state = [action.colorsList];
      break;
    case 'PUT_ALL_COLORS_TO_REDUCER':
      console.log(action, state)
      state = [action.colorsList];
      break; 
    case 'SEND_RESET_TO_REDUCER':
      state = [{red:{x:0, y:0},blue:{x:0, y:0},green:{x:0, y:0},purple:{x:0, y:0},pink:{x:0, y:0},black:{x:0, y:0},grey:{x:0, y:0},yellow:{x:0, y:0},brown:{x:0,y:0},turquoise:{x:0,y:0}}]
      break;
    default:
      console.log(action)
      break;
  }

  return state;
};

export default colorReducer;