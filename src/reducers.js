import {combineReducers} from 'redux'
import sessionReducer from './session/sessionReducer'
import monitorListReducer from './monitor/monitorListReducer'
import selectedMonitorReducer from './monitor/selectedMonitorReducer'
const rootReducer = combineReducers({
    session: sessionReducer,
    monitorList: monitorListReducer,
    selectedMonitorId: selectedMonitorReducer
});

export default rootReducer