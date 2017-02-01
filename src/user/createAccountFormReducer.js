import {CREATE_FAILED, CREATE_STARTED, CREATE_FULFILLED} from './UserActions'
export default (state = {errorMessage: null, succeeded: false}, action) => {
    switch (action.type) {
        case CREATE_STARTED:
            return {errorMessage: null, succeeded: false};
        case CREATE_FAILED:
            return {errorMessage: action.message, succeeded: false};
        case CREATE_FULFILLED:
            return {errorMessage: null, succeeded: true};
        default:
            return state
    }
};
