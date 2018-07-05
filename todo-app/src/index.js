import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';


//Socket listener
export const socket = io.connect('http://localhost:8080');

const app = (
    <Provider store={ store.createStore() }>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();