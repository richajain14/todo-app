import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../../actions';
import logoImage from '../../logo.svg';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3 mx-auto signin-form">
                <form name="form" className={submitted ? 'was-validated' : 'needs-validation'}
                      onSubmit={this.handleSubmit}>
                    <div className="text-center">
                        <img alt="logo image" src={logoImage} width="72" heigth="72"/>
                        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" required autoFocus={true}
                               name="username" value={user.username} onChange={this.handleChange} />
                        <div className="invalid-feedback">Username is required</div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" required
                               value={user.password} onChange={this.handleChange} />
                        <div className="invalid-feedback">Password is required</div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-sm btn-primary btn-block">Register</button>
                        {registering && <div className="loader"></div>
                        }
                        <Link to="/login" className="btn btn-sm btn-primary btn-block">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;

        if (user.username && user.password) {
            this.props.registerUser(user);
        }
    }
}

const stateToProps = (state) => {
    //state in todoReducer};
    return {
        registering: state.registering
    };
};

const dispatchToProps = (dispatch) => {
    return {
        registerUser: (user) => dispatch(userActions.register(user))
    };
};

export default connect(stateToProps, dispatchToProps)(RegisterPage);