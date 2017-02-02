import {combineReducers} from 'redux'
import sessionReducer from './session/sessionReducer'
import loginFormReducer from './session/loginFormReducer'
import monitorReducer from './monitor/monitorReducer'
import createAccountFormReducer from './user/createAccountFormReducer'
import createMonitorFormReducer from './monitor/createMonitorFormReducer'
import resetPasswordFormReducer from './user/resetPasswordFormReducer'
import contactReducer from './contact/contactReducer'
import editMonitorFormReducer from './monitor/editMonitorFormReducer'

const rootReducer = combineReducers({
    session: sessionReducer,
    monitor: monitorReducer,
    loginForm: loginFormReducer,
    createAccountForm: createAccountFormReducer,
    createMonitorForm: createMonitorFormReducer,
    resetPasswordForm: resetPasswordFormReducer,
    contacts: contactReducer,
    editMonitorForm: editMonitorFormReducer
});

export default rootReducer
