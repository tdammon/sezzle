import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './components/Calculator';
import configureSocket from './components/socket';
import { createStore } from 'redux';
import equationReducer from './redux/equationReducer';
import { Provider } from 'react-redux';

const store = createStore(equationReducer);

export const socket = configureSocket(store.dispatch);


ReactDOM.render(<Provider store={store}><Calculator /></Provider>, document.getElementById('root'));
