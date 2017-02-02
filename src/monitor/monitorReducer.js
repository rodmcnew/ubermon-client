import {
    MONITOR_LIST_RECEIVED,
    MONITOR_SELECTED,
    MONITOR_PINGS_RECEIVED,
    MONITOR_EVENTS_RECEIVED,
    CREATE_MONITOR_FULFILLED
} from './monitorActions'
export default (state = {list: [], pings: {}, events: {}, selectedMonitorId: null}, action) => {
    switch (action.type) {
        case MONITOR_LIST_RECEIVED:
            return Object.assign({}, state, {list: action.monitorList});
        case MONITOR_SELECTED:
            return Object.assign({}, state, {selectedMonitorId: action.monitorId});
        case MONITOR_EVENTS_RECEIVED:
            state = Object.assign({}, state);
            state.events[action.monitorId] = action.events;
            return state;
        case MONITOR_PINGS_RECEIVED:
            state = Object.assign({}, state);
            state.pings[action.monitorId] = action.pings;
            return state;
        case CREATE_MONITOR_FULFILLED:
            return Object.assign({}, state, {selectedMonitorId: action.monitor.id});
        default:
            return state
    }
};
