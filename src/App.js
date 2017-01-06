import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import {Router, Route, IndexRedirect, hashHistory} from 'react-router'
import LoginFormContainer from './login/LoginFormContainer'
import MonitorManagerContainer from './monitor/MonitorManagerContainer'
const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <div className="container" style={{maxWidth: '720px'}}>
                <div>
                    <a href="#/login">login</a>
                    &nbsp;|&nbsp;
                    <a href="#/dashboard">dashboard</a>
                </div>
                <Provider store={store}>
                    <div>
                        <Router history={hashHistory}>
                            <Route path="/">
                                <IndexRedirect to="login"/>
                                <Route path="login" component={LoginFormContainer}/>
                                <Route path="dashboard" component={MonitorManagerContainer}/>
                            </Route>
                        </Router>
                    </div>
                </Provider>
            </div>
        )
    }
}