import fetch from 'isomorphic-fetch'
import config from '../config'

export const MONITOR_LIST_RECEIVED = 'MONITOR_LIST_RECEIVED';
export const MONITOR_PINGS_RECEIVED = 'MONITOR_PINGS_RECEIVED';
export const MONITOR_EVENTS_RECEIVED = 'MONITOR_EVENTS_RECEIVED';
export const MONITOR_SELECTED = 'MONITOR_SELECTED';
export const DELETE_MONITOR_FULFILLED = 'DELETE_MONITOR_FULFILLED';
export const CREATE_MONITOR_FULFILLED = 'CREATE_MONITOR_FULFILLED';

export function createMonitor(monitor, onSuccess) {
    return (dispatch, getState) => {
        return fetch(config.apiBase + '/Monitors/', {
            method: 'POST',
            body: JSON.stringify(monitor),
            headers: {'Content-Type': 'application/json', 'authorization': getState().session.accessToken}
        })
            .then(parseResponse)
            .then((responseBody) => {
                onSuccess();
                return dispatch(createMonitorFulfilled(responseBody))
            })
    }
}

function createMonitorFulfilled(monitor) {
    return {
        type: CREATE_MONITOR_FULFILLED,
        monitor: monitor
    }
}
export function deleteMonitor(monitorId) {
    return (dispatch, getState) => {
        return fetch(config.apiBase + '/Monitors/' + monitorId, {
            method: 'DELETE',
            headers: {'authorization': getState().session.accessToken}
        })
            .then(parseResponse)
            .then(() => dispatch(deleteMonitorFulfilled(monitorId)))
    }
}

function deleteMonitorFulfilled(monitorId) {
    return {
        type: DELETE_MONITOR_FULFILLED,
        monitorId: monitorId
    }
}

export function selectMonitor(monitorId) {
    return monitorSelected(monitorId);
}

function monitorSelected(monitorId) {
    return {
        type: MONITOR_SELECTED,
        monitorId: monitorId
    }
}

export function fetchMonitorPings(monitorId,) {
    const filter = JSON.stringify({"where": {"monitorId": monitorId}, "order": "date DESC", "limit": 20});
    return (dispatch, getState) => {
        return fetch(config.apiBase + '/MonitorPings?filter=' + encodeURI(filter), {
            method: 'GET',
            headers: {'authorization': getState().session.accessToken}
        })
            .then(parseResponse)
            .then(json => dispatch(receiveMonitorPings(monitorId, json)))
    }
}

function receiveMonitorPings(monitorId, pings) {
    return {
        type: MONITOR_PINGS_RECEIVED,
        monitorId: monitorId,
        pings: pings
    }
}


export function fetchMonitorEvents(monitorId,) {
    const filter = JSON.stringify({"where": {"monitorId": monitorId}, "order": "date DESC", "limit": 10});
    return (dispatch, getState) => {
        return fetch(config.apiBase + '/MonitorEvents?filter=' + encodeURI(filter), {
            method: 'GET',
            headers: {'authorization': getState().session.accessToken}
        })
            .then(parseResponse)
            .then(json => dispatch(receiveMonitorEvents(monitorId, json)))
    }
}

function receiveMonitorEvents(monitorId, events) {
    return {
        type: MONITOR_EVENTS_RECEIVED,
        monitorId: monitorId,
        events: events
    }
}

export function fetchMonitorList() {
    return (dispatch, getState) => {
        return fetch(config.apiBase + '/Monitors/listMine', {
            method: 'GET',
            headers: {'authorization': getState().session.accessToken}
        })
            .then(parseResponse)
            .then(json => dispatch(receiveMonitorList(json.monitors)))
    }
}

function receiveMonitorList(monitorList) {
    return {
        type: MONITOR_LIST_RECEIVED,
        monitorList: monitorList
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
