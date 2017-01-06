import {LOGIN_FULFILLED} from './SessionActions'
export default (state = null, action) => {
    switch (action.type) {
        case LOGIN_FULFILLED:
            return {accessToken: action.accessToken, userId: action.userId};
        default:
            return state
    }
};