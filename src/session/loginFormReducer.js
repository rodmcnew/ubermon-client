import {LOGIN_FAILED, LOGIN_STARTED} from './SessionActions'
export default (state = {errorMessage: null}, action) => {
    switch (action.type) {
        case LOGIN_STARTED:
            return {errorMessage: null};
        case LOGIN_FAILED:
            return {errorMessage: action.message};
        default:
            return state
    }
};
