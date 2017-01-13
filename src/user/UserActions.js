import fetch from 'isomorphic-fetch'
import config from '../config'

export const CREATE_FULFILLED = 'CREATE_FULFILLED';
export const RESET_PASSWORD_FULFILLED = 'RESET_PASSWORD_FULFILLED';

export function create(credentials) {
    return dispatch => {
        return fetch(config.apiBase + '/Users', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
        })
            .then(parseResponse)
            .then(json => dispatch(createFulfilled(json)))
    }
}

function createFulfilled(json) {
    return {
        type: CREATE_FULFILLED,
        accessToken: json.id,
        userId: json.userId
    }
}

export function resetPassword(credentials) {
    return dispatch => {
        return fetch(config.apiBase + '/Users/reset', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
        })
            .then(parseJsonlessResponse)
            .then(() => dispatch(resetPasswordFulfilled()))
    }
}

function resetPasswordFulfilled() {
    return {
        type: RESET_PASSWORD_FULFILLED,
    }
}

//@TODO do not alert from the actions file. Maybe use axios instead of fetch?
function parseResponse(response) {
    switch (response.status) {
        case 401:
            alert('Unauthorized. Please ensure you are logged in.');
            break;
        case 200:
            return response.json();
        default:
            alert('Could not communicate with the server. Check your internet connection');
    }
}

function parseJsonlessResponse(response) {
    switch (response.status) {
        case 401:
            alert('Unauthorized. Please ensure you are logged in.');
            break;
        case 204://204!!!
            return true;
        default:
            alert('Could not communicate with the server. Check your internet connection');
    }
}
