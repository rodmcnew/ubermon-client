import {LOGIN, LOGIN_SUCCESS} from './sessionActions'
export default (state = null, action) => {
    switch (action.type) {
        case 'LOAD_STORED_STATE':
            return action.storedState.session;
        case LOGIN:
            return null;
        case LOGIN_SUCCESS:
            let data = action.payload.data;
            return {accessToken: data.id, userId: data.userId};
        default:
            return state
    }
};
