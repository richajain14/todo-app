import constants from '../constants';
import Axios from 'axios';
import _ from 'lodash';
import { history } from '../utils';
import { socket } from '../index';
import { TODO_UPDATED } from '../utils';

const apiUrl = 'http://localhost:8080/api';

export const addTodoSuccess = (todos) => {
    socket.emit(TODO_UPDATED);
    return {
        type: constants.ADD_TODO_SUCCESS,
        todos
    };
};

export const fetchTodosSuccess = (todos) => {
    return {
        type: constants.FETCH_TODOS_SUCCESS,
        todos
    };
};

export const updateTodoSuccess = (todo) => {
    socket.emit(TODO_UPDATED);
    return {
        type: constants.UPDATE_TODO_SUCCESS,
        todo
    };
};

export const deleteTodoSuccess = (message, id) => {
    socket.emit(TODO_UPDATED);
    return {
        type: constants.DELETE_TODO_SUCCESS,
        id
    };
};

export const registerSuccess = (data, user) => {
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/login');
    return {
        type: constants.REGISTER_SUCCESS,
        user
    };
};

export const loginSuccess = (res, user) => {
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/');
    return {
        type: constants.LOGIN_SUCCESS,
        user
    };
};

export const loginFailure = (error) => {
    return {
        type: constants.LOGIN_FAILURE,
        error: error.response.data
    };
};

export const registerFailure = (error) => {
    return {
        type: constants.REGISTER_FAILURE,
        error: error.response.data
    };
};

export const fetchTodos = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (dispatch) => {
        if(_.isEmpty(user) || !user.username) {
            return {
                type: constants.FETCH_TODOS_SUCCESS,
                todos: []
            };
        }

        return Axios.get(`${apiUrl}/todos?username=${user ? user.username: ''}`)
            .then((response) => {
                dispatch(fetchTodosSuccess(response.data));
            })
            .catch((error) => {
                throw(error);
            });
    };
};

export const addTodo = (todo) => {
    return (dispatch) => {
        return Axios.post(`${apiUrl}/todos`, {
            text: todo.text,
            completed: todo.completed,
            isPublic: todo.isPublic,
            username: todo.username
        })
        .then((response) => {
            dispatch(addTodoSuccess(response.data));
        })
        .catch((error) => {
            /*Todo: add failure alert*/
            throw(error);
        });
    };
};

export const updateTodo = (todo) => {
    return (dispatch) => {
        return Axios.put(`${apiUrl}/todos/${todo._id}`, todo)
            .then((response) => {
                dispatch(updateTodoSuccess(response.data));
            })
            .catch((error) => {
                /*Todo: update failure alert*/
                throw(error);
            });
    };
};

export const deleteTodo = (todoId) => {
    return (dispatch) => {
        return Axios.delete(`${apiUrl}/todos/${todoId}`)
            .then((response) => {
                dispatch(deleteTodoSuccess(response.data, todoId));
            })
            .catch((error) => {
                /*Todo: delete failure alert*/
                throw(error);
            });
    };
};

export const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    return {
        type: constants.LOGOUT
    };
};

export const login = (username, password) => {
    let newUser = {
        username: username,
        password: password
    };
    return (dispatch) =>  {
        return Axios.post(`${apiUrl}/authenticateUser`, newUser)
        .then((response) => {
            dispatch(loginSuccess(response, newUser));
        })
        .catch((error) => {
            dispatch(loginFailure(error));
            throw(error);
        });
    };
};

export const register = (user) => {
    let newUser = {
        username: user.username,
        password: user.password
    };
    return (dispatch) => {
        return Axios.post(`${apiUrl}/user`, newUser)
        .then((response) => {
            dispatch(registerSuccess(response, newUser));
        })
        .catch((error) => {
            dispatch(registerFailure(error));
            throw(error);
        });
    };
};

