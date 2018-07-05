import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { history } from './utils';
import './App.css';
import TodoPage from './components/containers/TodoPage';
import LoginPage from './components/containers/LoginPage';
import RegisterPage from './components/containers/RegisterPage';
import { PrivateRoute } from './components/containers/PrivateRoute';
import * as todoActions from './actions';
import { socket } from './index';
import { TODO_UPDATED } from './utils';

class App extends Component {
    componentDidMount() {
        socket.on(TODO_UPDATED, (res) => {
            this.props.fetchTodos();
        });

        /*Fetch all the todos on load.*/
        this.props.fetchTodos();
    }

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={TodoPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </div>
                </Router>
            </div>
        );
    }
}

const stateToProps = (state) => {
    return {};
};

const dispatchToProps = (dispatch) => {
    return {
        fetchTodos: () => dispatch(todoActions.fetchTodos())
    };
};

export default connect(stateToProps, dispatchToProps)(App);
