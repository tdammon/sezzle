import { combineReducers } from 'redux';
import colorReducer from './colorReducer';
import equationReducer from './equationReducer';
import playerReducer from './playerReducer';


const rootReducer = combineReducers({
    colorReducer,
    equationReducer,
    playerReducer
});

export default rootReducer;