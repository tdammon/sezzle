import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureSocket from './components/socket';
import { createStore } from 'redux';
import rootReducer from './redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

export const socket = configureSocket(store.dispatch);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
