import {combineReducers} from 'redux'
import sessionReducer from './session/sessionReducer'
import monitorListReducer from './monitor/monitorListReducer'
const rootReducer = combineReducers({
    session: sessionReducer,
    monitorList: monitorListReducer
});

export default rootReducer