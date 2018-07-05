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
            <div className="input-group mb-3">
                <input type="text"
                       className="form-control"
                       placeholder="Add a to do..."
                       aria-label="Add a to do"
                       aria-describedby="basic-addon2"
                       autoFocus={true}
                       onChange={this.updateTodo}
                       value={this.state.newTask}/>
                <div className="input-group-append">
                    <button className="btn btn-primary"
                            type="button"
                    onClick={this.addTodo}>
                        Add To Do
                    </button>
                </div>
            </div>
        );
    }

    addTodo() {
        if (this.state.newTask && this.state.newTask.length > 0) {
            let newTodo = {
                text: this.state.newTask,
                completed: false,
                isPublic: false,
                username: this.props.user.username
            };
            this.props.addTodo(newTodo);
        }

        this.setState({ newTask: '' }); //clear the input field after add
    }

    updateTodo(event) {
        this.setState({ newTask: event.target.value });
    }
}

AddTodo.propType = {
    addTodo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default AddTodo;
