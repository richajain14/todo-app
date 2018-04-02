import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as todoActions from '../../actions';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

class Todos extends Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.addTodo = this.addTodo.bind(this);
        this.updateTodoStatus = this.updateTodoStatus.bind(this);
    }

    render() {
        return (
            <div className="container-fluid mx-auto w-75 p-5">
                <AddTodo addTodo={this.addTodo} />
                <div className="mb-3">
                    <TodoList toggleTodo={this.updateTodoStatus} todos={this.props.todos}/>
                </div>
            </div>
        );
    }

    addTodo(newTask) {
        this.props.addTodo(newTask); //call the dispatch to addTodo
    }

    updateTodoStatus(todo) {
        if (todo !== null || todo !== undefined) {
            this.props.changeTodoStatus(todo); //call dispatch to change completed status of a todo
        }
    }
}

const stateToProps = (state) => {
    return {
        todos: state.todos //todos created in the store pointing to todoReducer
    };
};

const dispatchToProps = (dispatch) => {
    return {
        addTodo: (todo) => dispatch(todoActions.addTodo(todo)),
        changeTodoStatus: (todo) => dispatch(todoActions.changeTodoStatus(todo))
    };
};

export default connect(stateToProps, dispatchToProps)(Todos);
