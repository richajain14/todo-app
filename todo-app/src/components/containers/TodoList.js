import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../customCheckbox.css';

class TodoList extends Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.toggleTodo = this.toggleTodo.bind(this);
    }

    render() {
        const list = this.props.todos;

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
                                   defaultChecked={item.completed}
                                   value={item.id}
                                   onClick={this.toggleTodo}/>
                            <label className="mb-0" htmlFor={chkId}>{item.text}</label>
                        </li>
                    );
                })}
            </ul>
        );
    }

    toggleTodo(event) {
        let todo = this.props.todos.filter((item) => item.id == event.target.value)[0];
        todo = { ...todo }; //copy so the props is modified
        todo.completed = event.target.checked;
        this.props.toggleTodo(todo);
    }
}

TodoList.propType = {
    toggleTodo: PropTypes.func.isRequired,
    todos: PropTypes.array
};

TodoList.defaultProps = {
    todos: []
};

export default TodoList;
