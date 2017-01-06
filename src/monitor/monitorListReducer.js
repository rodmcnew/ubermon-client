import {MONITOR_LIST_RECEIVED} from './MonitorActions'
export default (state = [], action) => {
    switch (action.type) {
        case MONITOR_LIST_RECEIVED:
            return action.monitorList;
        default:
            return state
    }
};