import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { todoReducer, userReducer } from '../reducers';

let store = null;
export default {
    createStore: () => {
        const reducers = combineReducers({
            todos: todoReducer,
            user: userReducer
        });

        const store = createStore(reducers, applyMiddleware(thunk));

        return store;
    },

    currentStore: () => {
        return store;
    }
};
