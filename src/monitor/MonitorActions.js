import fetch from 'isomorphic-fetch'

export const MONITOR_LIST_RECEIVED = 'MONITOR_LIST_RECEIVED';
export const MONITOR_SELECTED = 'MONITOR_SELECTED';

let userApiBase = 'http://www.ubermon.com/api/Monitors';

export function selectMonitor(monitorId) {
    return monitorSelected(monitorId);
}

function monitorSelected(monitorId) {
    return {
        type: MONITOR_SELECTED,
        monitorId: monitorId
    }
}


export function fetchMonitorList() {
    return (dispatch, getState) => {
        const state = getState();
        return fetch(userApiBase + '/listMine?access_token=' + state.session.accessToken, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
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
