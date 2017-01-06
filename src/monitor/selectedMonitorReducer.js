import {MONITOR_SELECTED} from './MonitorActions'
export default (state = null, action) => {
    switch (action.type) {
        case MONITOR_SELECTED:
            return action.monitorId;
        default:
            return state
    }
};