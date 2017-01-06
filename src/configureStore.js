import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import {createSession} from 'redux-session';

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
            localStorageSession,
            loggerMiddleware
        )
    )
}

