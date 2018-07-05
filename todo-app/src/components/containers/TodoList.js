import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../customCheckbox.css';

class TodoList extends Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.toggleTodo = this.toggleTodo.bind(this);
        this.toggleisPublic = this.toggleisPublic.bind(this);
    }

    render() {
        const list = this.props.todos;
        const user = this.props.user;

        if (!list) {
            return null;
        }

        return (
            <ul className="list-group">
                {list.map((item, i) => {
                    let chkId = `styled-checkbox-${i}`;
                    return (
                        <li className="list-group-item p-2 mt-2" key={chkId}>
                            <input className="styled-checkbox"
                                   id={chkId}
                                   ref="chkBox"
                                   type="checkbox"
                                   checked={item.completed}
                                   value={item._id}
                                   disabled={user.username !== item.username}
                                   onChange={this.toggleTodo}/>
                            <label className="mb-0" htmlFor={chkId}>{item.text}</label>
                            {user.username === item.username
                            && <div className="row float-right">
                                <div className="col-md-auto">
                                    <input className="styled-checkbox"
                                           id={`public-${chkId}`}
                                           ref="publicChkBox"
                                           type="checkbox"
                                           checked={item.isPublic}
                                           value={item._id}
                                           disabled={user.username !== item.username}
                                           onChange={this.toggleisPublic}/>
                                    <label className="form-check-label" htmlFor={`public-${chkId}`}>
                                        Show to others
                                    </label>
                                </div>
                                <div className="col">
                                <button className="btn btn-sm btn-primary"
                                       onClick={this.handleDelete.bind(this, item)}>Delete</button>
                                </div>

                            </div>
                            }
                        </li>
                    );
                })}
            </ul>
        );
    }

    toggleisPublic(event) {
        console.log(event.target)
        event.preventDefault();
        let todo = this.props.todos.filter((item) => item._id === event.target.value)[0];
        todo = { ...todo }; //copy so the props is modified
        todo.isPublic = event.target.checked;
        this.props.updateTodo(todo);
    }

    toggleTodo(event) {
        event.preventDefault();
        let todo = this.props.todos.filter((item) => item._id === event.target.value)[0];
        todo = { ...todo }; //copy so the props is modified
        todo.completed = event.target.checked;
        this.props.updateTodo(todo);
    }

    handleDelete(todo) {
        const todoId = todo._id;
        this.props.onDelete(todoId);
    }
}

TodoList.propType = {
    updateTodo: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    todos: PropTypes.array,
    user: PropTypes.object
};

TodoList.defaultProps = {
    todos: []
};

export default TodoList;
