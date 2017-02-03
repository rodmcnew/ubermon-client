import {LOGIN_FAIL, LOGIN} from './sessionActions'
export default (state = {errorMessage: null}, action) => {
    switch (action.type) {
        case LOGIN:
            return {errorMessage: null};
        case LOGIN_FAIL:
            switch (action.error.data) {
                case 'Request failed with status code 401':
                    return {errorMessage: 'Invalid login credentials'};
                case 'Network Error':
                    return {
                        errorMessage: 'Could not communicate with the server. '
                        + 'Check your internet connection and try again'
                    };
                default:
                    return {errorMessage: 'An unknown error occurred'};
            }
        default:
            return state
    }
};
