import {RECEIVE_MONITOR_LIST} from './MonitorActions'
export default (state = [], action) => {
    switch (action.type) {
        case RECEIVE_MONITOR_LIST:
            return action.monitorList;
        default:
            return state
    }
};