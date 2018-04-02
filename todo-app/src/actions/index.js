import constants from '../constants';
import Axios from 'axios';
import qs from 'qs';

const apiUrl = 'http://quip-todos.herokuapp.com';

export const addTodoSuccess = (todo) => {
    return {
        type: constants.ADD_TODO_SUCCESS,
        todo
    };
};

export const fetchTodosSuccess = (todos) => {
    return {
        type: constants.FETCH_TODOS_SUCCESS,
        todos
    };
};

export const updateTodoSuccess = (todo) => {
    return {
        type: constants.UPDATE_TODO_SUCCESS,
        todo
    };
};

export const fetchTodos = () => {
    return (dispatch) => {
        return Axios.get(`${apiUrl}/get_todos?email=example@gmail.com`)
            .then((response) => {
                dispatch(fetchTodosSuccess(response.data));
            })
            .catch((error) => {
                throw(error);
            });
    };
};

export const addTodo = (todoText) => {
    return (dispatch) => {
        return Axios.post(`${apiUrl}/add_todo`, qs.stringify({
            email: 'example@gmail.com',
            text: todoText
        }))
            .then((response) => {
                dispatch(addTodoSuccess(response.data));
            })
            .catch((error) => {
                throw(error);
            });
    };
};

export const changeTodoStatus = (todo) => {
    return (dispatch) => {
        return Axios.post(`${apiUrl}/mark_completed`, qs.stringify({
            email: 'example@gmail.com',
            id: todo.id,
            completed: todo.completed
        }))
            .then((response) => {
                dispatch(updateTodoSuccess(response.data));;
            })
            .catch((error) => {
                throw(error);
            });
    };
};

