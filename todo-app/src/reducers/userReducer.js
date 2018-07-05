import constants from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case constants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case constants.LOGIN_FAILURE:
            return {
                error: action.error
            };
        case constants.LOGOUT:
            return {};
        case constants.REGISTER_REQUEST:
            return {
                registering: true
            };
        case constants.REGISTER_SUCCESS:
            return {};
        case constants.REGISTER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
};
