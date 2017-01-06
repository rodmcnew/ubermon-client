import {MONITOR_SELECTED, MONITOR_LIST_RECEIVED} from './MonitorActions'
export default (state = null, action) => {
    switch (action.type) {
        case MONITOR_LIST_RECEIVED:
            if (state == null && action.monitorList.length > 0) {
                // If no monitor is selected and we have monitors, select the first one
                return action.monitorList[0].id
            }
            return state;
        case MONITOR_SELECTED:
            return action.monitorId;
        default:
            return state
    }
};