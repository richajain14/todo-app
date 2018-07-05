import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../../actions';
import logoImage from '../../logo.svg';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logoutUser();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3 mx-auto signin-form">
                <form name="form" className={submitted ? 'was-validated' : 'needs-validation'}
                      onSubmit={this.handleSubmit}>
                    <div className="text-center">
                        <img alt="logo image" src={logoImage} width="72" heigth="72"/>
                        <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" required autoFocus={true}
                               name="username" value={username} onChange={this.handleChange} />
                        <div className="invalid-feedback">Username is required</div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" required
                               value={password} onChange={this.handleChange} />
                        <div className="invalid-feedback">Password is required</div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-sm btn-primary btn-block">Login</button>
                        {loggingIn && <div class="loader"></div>}
                        <Link to="/register" className="btn btn-sm btn-primary btn-block">Register</Link>
                    </div>
                </form>
            </div>
        );
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;

        if (username && password) {
            this.props.loginUser(username, password);
        }
    }
};

const stateToProps = (state) => {
    //state in todoReducer};
    return {
        loggingIn: state.loggingIn
    };
};

const dispatchToProps = (dispatch) => {
    return {
        loginUser: (username, password) => dispatch(userActions.login(username, password)),
        logoutUser: () => dispatch(userActions.logout())
    };
};

export default connect(stateToProps, dispatchToProps)(LoginPage);
