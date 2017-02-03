import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import {createSession} from 'redux-session';
import axiosMiddleware from 'redux-axios';
import httpClient from './httpClient'

const loggerMiddleware = createLogger();

const localStorageSession = createSession({
    ns: 'ubermon-session',
    selectState (state) {
        return {
            session: state.session
        };
    }
});

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            axiosMiddleware({default: httpClient}),
            localStorageSession,
            loggerMiddleware
        )
    )
}

