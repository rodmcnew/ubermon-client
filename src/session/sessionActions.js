import fetch from 'isomorphic-fetch'
import config from '../config'

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function login(credentials, onSuccess) {
    return dispatch => {
        dispatch(loginStarted());
        return fetch(config.apiBase + '/Users/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            response.json().then((body) => {
                switch (response.status) {
                    case 200:
                        dispatch(loginFulfilled(body));
                        onSuccess();
                        break;
                    case 401:
                    case 400:
                        dispatch(loginFailed(body.error.message));
                        break;
                    default:
                        throw new Error('Unexpected status code received from server');
                }
            })
        }).catch(reason => {
            dispatch(loginFailed(
                'Could not communicate with the server. Check your internet connection and try again.'
            ));
            throw reason;
        })
    }
}


function loginStarted() {
    return {
        type: LOGIN_STARTED,
    }
}

function loginFulfilled(json) {
    return {
        type: LOGIN_FULFILLED,
        accessToken: json.id,
        userId: json.userId
    }
}

function loginFailed(message) {
    return {
        type: LOGIN_FAILED,
        message: message,
    }
}
