import fetch from 'isomorphic-fetch'

export const RECEIVE_MONITOR_LIST = 'RECEIVE_MONITOR_LIST';

let userApiBase = 'http://www.ubermon.com/api/Monitors';

export function fetchMonitorListIfNeeded(accessToken) {
    return (dispatch, getState) => {
       const state=getState();
        console.log(state);
        if(!state.session){
            return;//@TODO do better here?
        }
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
        type: RECEIVE_MONITOR_LIST,
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