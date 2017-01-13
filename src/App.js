import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import MonitorManagerContainer from './monitor/MonitorManagerContainer'
import Home from './home/Home'
import './App.css'
const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <a href="#/">home</a>
                    &nbsp;|&nbsp;
                    <a href="#/dashboard">dashboard</a>
                    &nbsp;|&nbsp;
                    <a href="http://ubermon.herokuapp.com/explorer/">api docs</a>
                </div>
                <Provider store={store}>
                    <div>
                        <Router history={hashHistory}>
                            <Route path="/">
                                <IndexRoute component={Home}/>
                                <Route path="dashboard" component={MonitorManagerContainer}/>
                            </Route>
                        </Router>
                    </div>
                </Provider>
            </div>
        )
    }
}
