import {combineReducers} from 'redux'
import sessionReducer from './session/sessionReducer'
import loginFormReducer from './session/loginFormReducer'
import monitorReducer from './monitor/monitorReducer'
import createAccountFormReducer from './user/createAccountFormReducer'
import createMonitorFormReducer from './monitor/createMonitorFormReducer'
const rootReducer = combineReducers({
    session: sessionReducer,
    monitor: monitorReducer,
    loginForm: loginFormReducer,
    createAccountForm: createAccountFormReducer,
    createMonitorForm: createMonitorFormReducer
});

export default rootReducer
