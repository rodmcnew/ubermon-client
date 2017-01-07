import fetch from 'isomorphic-fetch'

export const MONITOR_LIST_RECEIVED = 'MONITOR_LIST_RECEIVED';
export const MONITOR_PINGS_RECEIVED = 'MONITOR_PINGS_RECEIVED';
export const MONITOR_EVENTS_RECEIVED = 'MONITOR_EVENTS_RECEIVED';
export const MONITOR_SELECTED = 'MONITOR_SELECTED';

let apiBase = 'https://ubermon.herokuapp.com/api/';
let monitorApiBase = apiBase + 'Monitors';
let pingApiBase = apiBase + 'MonitorPings';
let eventApiBase = apiBase + 'MonitorEvents';

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
        return fetch(pingApiBase + '?filter=' + encodeURI(filter), {
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
        return fetch(eventApiBase + '?filter=' + encodeURI(filter), {
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
        return fetch(monitorApiBase + '/listMine', {
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
