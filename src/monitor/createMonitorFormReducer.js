import {CREATE_MONITOR_FAILED, CREATE_MONITOR_STARTED} from './MonitorActions'
export default (state = {errorMessage: null}, action) => {
    switch (action.type) {
        case CREATE_MONITOR_STARTED:
            return {errorMessage: null};
        case CREATE_MONITOR_FAILED:
            return {errorMessage: action.message};
        default:
            return state
    }
};
