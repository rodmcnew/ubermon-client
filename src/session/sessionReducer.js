import {LOGIN_FULFILLED} from './sessionActions'
export default (state = null, action) => {
    switch (action.type) {
        case 'LOAD_STORED_STATE':
            return action.storedState.session;
        case LOGIN_FULFILLED:
            return {accessToken: action.accessToken, userId: action.userId};
        default:
            return state
    }
};
