import fetch from 'isomorphic-fetch'
import config from '../config'

export const CONTACTS_RECEIVED = 'CONTACTS_RECEIVED';
// export const CONTACT_SELECTED = 'CONTACT_SELECTED';
// export const DELETE_CONTACT_FULFILLED = 'DELETE_CONTACT_FULFILLED';
// export const CREATE_CONTACT_STARTED = 'CREATE_CONTACT_STARTED';
// export const CREATE_CONTACT_FULFILLED = 'CREATE_CONTACT_FULFILLED';
// export const CREATE_CONTACT_FAILED = 'CREATE_CONTACT_FAILED';

// export function createContact(contact, onSuccess) {
//     return (dispatch, getState) => {
//         dispatch(createContactStarted());
//         return fetch(config.apiBase + '/Contacts/', {
//             method: 'POST',
//             body: JSON.stringify(contact),
//             headers: {'Content-Type': 'application/json', 'authorization': getState().session.accessToken}
//         }).then(response => {
//             response.json().then((body) => {
//                 switch (response.status) {
//                     case 200:
//                         dispatch(createContactFulfilled(body));
//                         onSuccess();
//                         break;
//                     case 422:
//                     case 400:
//                         dispatch(createContactFailed(body.error.message));
//                         break;
//                     default:
//                         throw new Error('Unexpected status code received from server');
//                 }
//             })
//         }).catch(reason => {
//             dispatch(createContactFailed(
//                 'Could not communicate with the server. Check your internet connection and try again.'
//             ));
//             throw reason;
//         })
//     }
// }
//
// function createContactStarted() {
//     return {
//         type: CREATE_CONTACT_STARTED,
//     }
// }
// function createContactFulfilled(contact) {
//     return {
//         type: CREATE_CONTACT_FULFILLED,
//         contact: contact
//     }
// }
// function createContactFailed(message) {
//     return {
//         type: CREATE_CONTACT_FAILED,
//         message: message
//     }
// }
//
// export function deleteContact(contactId) {
//     return (dispatch, getState) => {
//         return fetch(config.apiBase + '/Contacts/' + contactId, {
//             method: 'DELETE',
//             headers: {'authorization': getState().session.accessToken}
//         })
//             .then(parseResponse)
//             .then(() => dispatch(deleteContactFulfilled(contactId)))
//     }
// }
//
// function deleteContactFulfilled(contactId) {
//     return {
//         type: DELETE_CONTACT_FULFILLED,
//         contactId: contactId
//     }
// }
//
// export function selectContact(contactId) {
//     return contactSelected(contactId);
// }
//
// function contactSelected(contactId) {
//     return {
//         type: CONTACT_SELECTED,
//         contactId: contactId
//     }
// }
//
// export function fetchContactPings(contactId,) {
//     const filter = JSON.stringify({"where": {"contactId": contactId}, "order": "date DESC", "limit": 20});
//     return (dispatch, getState) => {
//         return fetch(config.apiBase + '/ContactPings?filter=' + encodeURI(filter), {
//             method: 'GET',
//             headers: {'authorization': getState().session.accessToken}
//         })
//             .then(parseResponse)
//             .then(json => dispatch(receiveContactPings(contactId, json)))
//     }
// }
//
// function receiveContactPings(contactId, pings) {
//     return {
//         type: CONTACT_PINGS_RECEIVED,
//         contactId: contactId,
//         pings: pings
//     }
// }
//
//
// export function fetchContactEvents(contactId,) {
//     const filter = JSON.stringify({"where": {"contactId": contactId}, "order": "date DESC", "limit": 10});
//     return (dispatch, getState) => {
//         return fetch(config.apiBase + '/ContactEvents?filter=' + encodeURI(filter), {
//             method: 'GET',
//             headers: {'authorization': getState().session.accessToken}
//         })
//             .then(parseResponse)
//             .then(json => dispatch(receiveContactEvents(contactId, json)))
//     }
// }
//
// function receiveContactEvents(contactId, events) {
//     return {
//         type: CONTACT_EVENTS_RECEIVED,
//         contactId: contactId,
//         events: events
//     }
// }

export function fetchContacts() {
    return (dispatch, getState) => {
        return fetch(config.apiBase + '/Contacts/listMine', {
            method: 'GET',
            headers: {'authorization': getState().session.accessToken}
        })
            .then(parseResponse)
            .then(json => dispatch(receiveContacts(json.contacts)))
    }
}

function receiveContacts(contacts) {
    return {
        type: CONTACTS_RECEIVED,
        contacts: contacts
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
