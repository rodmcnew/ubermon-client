import {combineReducers} from 'redux'
import sessionReducer from './session/sessionReducer'
import monitorReducer from './monitor/monitorReducer'
const rootReducer = combineReducers({
    session: sessionReducer,
    monitor: monitorReducer,
});

export default rootReducer