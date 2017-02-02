import {CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_STARTED, CHANGE_PASSWORD_FULFILLED} from './userActions'
export default (state = {errorMessage: null, succeeded: false}, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_STARTED:
            return {errorMessage: null, succeeded: false};
        case CHANGE_PASSWORD_FAILED:
            return {errorMessage: action.message, succeeded: false};
        case CHANGE_PASSWORD_FULFILLED:
            return {errorMessage: null, succeeded: true};
        default:
            return state
    }
};
