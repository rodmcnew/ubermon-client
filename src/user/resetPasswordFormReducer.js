import {RESET_PASSWORD_FAILED, RESET_PASSWORD_STARTED, RESET_PASSWORD_FULFILLED} from './UserActions'
export default (state = {errorMessage: null, succeeded: false}, action) => {
    switch (action.type) {
        case RESET_PASSWORD_STARTED:
            return {errorMessage: null, succeeded: false};
        case RESET_PASSWORD_FAILED:
            return {errorMessage: action.message, succeeded: false};
        case RESET_PASSWORD_FULFILLED:
            return {errorMessage: null, succeeded: true};
        default:
            return state
    }
};
