import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logoImage from '../../logo.svg';

class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.renderLoginLink = this.renderLoginLink.bind(this);
    }

    render() {
        const brandStyle = {
            width: '40px',
            height: '40px',
            backgroundImage: `url(${logoImage})`
        };
        return (
            <nav className="navbar fixed-top navbar-light">
                <h1 className="text-hide" style={brandStyle}>Bootstrap</h1>
                <a className="navbar-brand">Todo List</a>
                <div className="btn-group" role="group" aria-label="Basic example">
                    {this.renderLoginLink()}
                </div>
            </nav>
        );
    }

    renderLoginLink() {
        if (this.props.user && this.props.user.username) {
            return (
                <Link className="btn btn-sm btn-outline-primary" to="/login">Logout</Link>
            );
        } else {
            return (
                <Link className="btn btn-sm btn-outline-primary" to="/login">Login</Link>
            );
        }
    }
}

const stateToProps = (state) => {
    return {
        user: state.user.user
    };
};

export default connect(stateToProps)(PageHeader);
