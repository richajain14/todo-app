import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as todoActions from '../../actions';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

class Todos extends Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.addTodo = this.addTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    render() {
        return (
            <div className="my-3 p-3 bg-white rounded box-shadow">
                <AddTodo
                    addTodo={this.addTodo}
                    user={this.props.user} />
                <div className="mb-3">
                    <TodoList
                        updateTodo={this.updateTodo}
                        onDelete={this.deleteTodo}
                        todos={this.props.todos}
                        user={this.props.user} />
                </div>
            </div>
        );
    }

    addTodo(newTodo) {
        /*call the dispatch to addTodo*/
        this.props.addTodo(newTodo);
    }

    updateTodo(todo) {
        if (!_.isEmpty(todo)) {
            /*call dispatch to change completed status of a todo*/
            this.props.updateTodo(todo);
        }
    }

    deleteTodo(todoId) {
        this.props.deleteTodo(todoId);
    }
}

const stateToProps = (state) => {
    return {
        //todos created in the store pointing to todoReducer
        todos: state.todos,
        user: state.user.user
    };
};

const dispatchToProps = (dispatch) => {
    return {
        fetchTodos: () => dispatch(todoActions.fetchTodos()),
        addTodo: (todo) => dispatch(todoActions.addTodo(todo)),
        updateTodo: (todo) => dispatch(todoActions.updateTodo(todo)),
        deleteTodo: (todoId) => dispatch(todoActions.deleteTodo(todoId))
    };
};

export default connect(stateToProps, dispatchToProps)(Todos);
