import {CREATE_MONITOR_FAILED, CREATE_MONITOR_STARTED, MONITOR_SELECTED} from './monitorActions'
export default (state = {errorMessage: null}, action) => {
    switch (action.type) {
        case MONITOR_SELECTED: //Clear the error message if a new monitor was selected
        case CREATE_MONITOR_STARTED:
            return {errorMessage: null};
        case CREATE_MONITOR_FAILED:
            return {errorMessage: action.message};
        default:
            return state
    }
};
