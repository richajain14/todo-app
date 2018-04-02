import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: ''
        };

        // This binding is necessary to make `this` work in the callback
        this.addTodo = this.addTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    render() {
        return (
            <div className="input-group">
                <input type="text"
                       className="form-control"
                       placeholder="Add a to do..."
                       aria-label="Add a to do"
                       aria-describedby="basic-addon2"
                       onChange={this.updateTodo}
                       value={this.state.newTask}/>
                <div className="addBtn position-absolute">
                    <a className="badge badge-primary p-1" href="#"
                       onClick={this.addTodo}>Add To Do</a>
                </div>
            </div>
        );
    }

    addTodo() {
        if (this.state.newTask && this.state.newTask.length > 0) {
            this.props.addTodo(this.state.newTask);
        }

        this.setState({ newTask: '' }); //clear the input field after add
    }

    updateTodo(event) {
        this.setState({ newTask: event.target.value });
    }
}

AddTodo.propType = {
    addTodo: PropTypes.func.isRequired
};

export default AddTodo;
