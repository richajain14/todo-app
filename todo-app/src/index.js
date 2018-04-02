import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import * as todoActions from './actions';
import registerServiceWorker from './registerServiceWorker';

let thisStore = store.createStore();
thisStore.dispatch(todoActions.fetchTodos()); //Fetch all the todos first thing.

const app = (
    <Provider store={ thisStore }>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();