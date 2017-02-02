import fetch from 'isomorphic-fetch'
import config from '../config'

export const CREATE_STARTED = 'CREATE_STARTED';
export const CREATE_FULFILLED = 'CREATE_FULFILLED';
export const CREATE_FAILED = 'CREATE_FAILED';
export const RESET_PASSWORD_STARTED = 'RESET_PASSWORD_STARTED';
export const RESET_PASSWORD_FULFILLED = 'RESET_PASSWORD_FULFILLED';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const CHANGE_PASSWORD_STARTED = 'CHANGE_PASSWORD_STARTED';
export const CHANGE_PASSWORD_FULFILLED = 'CHANGE_PASSWORD_FULFILLED';
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED';

export function create(credentials) {
    return dispatch => {
        dispatch(createStarted());
        return fetch(config.apiBase + '/Users', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            response.json().then((body) => {
                switch (response.status) {
                    case 200:
                        dispatch(createFulfilled(body));
                        break;
                    case 422:
                    case 400:
                        dispatch(createFailed(body.error.message));
                        break;
                    default:
                        throw new Error('Unexpected status code received from server');
                }
            })
        }).catch(reason => {
            dispatch(createFailed(
                'Could not communicate with the server. Check your internet connection and try again.'
            ));
            throw reason;
        })
    }
}

function createStarted() {
    return {
        type: CREATE_STARTED,
    }
}
function createFulfilled(json) {
    return {
        type: CREATE_FULFILLED,
        userId: json.id
    }
}
function createFailed(message) {
    return {
        type: CREATE_FAILED,
        message: message
    }
}

export function resetPassword(credentials, onSuccess) {
    return dispatch => {
        dispatch(resetPasswordStarted());
        return fetch(config.apiBase + '/Users/reset', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            switch (response.status) {
                case 204:
                    dispatch(resetPasswordFulfilled());
                    onSuccess();
                    break;
                case 404:
                case 400:
                    response.json().then((body) => {
                        dispatch(resetPasswordFailed(body.error.message));
                    });
                    break;
                default:
                    throw new Error('Unexpected status code received from server');
            }
        }).catch(reason => {
            dispatch(resetPasswordFailed(
                'Could not communicate with the server. Check your internet connection and try again.'
            ));
            throw reason;
        })
    }
}

function resetPasswordStarted() {
    return {
        type: RESET_PASSWORD_STARTED,
    }
}

function resetPasswordFulfilled() {
    return {
        type: RESET_PASSWORD_FULFILLED,
    }
}

function resetPasswordFailed(message) {
    return {
        type: RESET_PASSWORD_FAILED,
        message: message
    }
}


export function changePassword(userId, newPassword, authToken) {
    return dispatch => {
        dispatch(changePasswordStarted());
        return fetch(config.apiBase + '/Users/' + userId, {
            method: 'PUT',
            body: JSON.stringify({password: newPassword}),
            headers: {'Content-Type': 'application/json', authorization: authToken}
        }).then(response => {
            switch (response.status) {
                case 200:
                    dispatch(changePasswordFulfilled());
                    break;
                case 401:
                case 400:
                    response.json().then((body) => {
                        dispatch(changePasswordFailed(body.error.message));
                    });
                    break;
                default:
                    throw new Error('Unexpected status code received from server');
            }
        }).catch(reason => {
            dispatch(changePasswordFailed(
                'Could not communicate with the server. Check your internet connection and try again.'
            ));
            throw reason;
        })
    }
}

function changePasswordStarted() {
    return {
        type: CHANGE_PASSWORD_STARTED,
    }
}

function changePasswordFulfilled() {
    return {
        type: CHANGE_PASSWORD_FULFILLED,
    }
}

function changePasswordFailed(message) {
    return {
        type: CHANGE_PASSWORD_FAILED,
        message: message
    }
}

