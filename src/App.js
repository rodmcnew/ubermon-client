import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import MonitorManagerContainer from './monitor/MonitorManagerContainer'
import ResetPasswordContainer from './user/ResetPasswordContainer'
import Home from './home/Home'
import Privacy from './legal/Privacy'
import Terms from './legal/Terms'
// import ContactUs from './contact-us/ContactUs'
import './App.css'
const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="row">
                        <div className="col-sm-6">
                            <h2 style={{display: 'inline'}}><a href="/">Ubermon</a></h2>
                            <span>&nbsp;</span>
                            Website downtime alerts. Free, simple, and easy.
                        </div>
                        <div className="col-sm-6">
                            <div className="pull-right">
                                <a href="/#dashboard">Dashboard</a>
                                <span>&nbsp;|&nbsp;</span>
                                <a href="/#privacy">Privacy</a>
                                <span>&nbsp;|&nbsp;</span>
                                <a href="/#terms">Terms</a>
                                {/*<span>&nbsp;|&nbsp;</span>*/}
                                {/*<a href="https://ubermon.herokuapp.com/explorer/">*/}
                                {/*<span>&nbsp;|&nbsp;</span>*/}
                                {/*<a href="/#contact">Contact Us</a>*/}
                            </div>
                        </div>
                        <br/><br/>
                    </div>
                </div>
                <Provider store={store}>
                    <div>
                        <Router history={hashHistory}>
                            <Route path="/">
                                <IndexRoute component={Home}/>
                                <Route path="dashboard" component={MonitorManagerContainer}/>
                                <Route path="reset-password" component={ResetPasswordContainer}/>
                                <Route path="privacy" component={Privacy}/>
                                <Route path="terms" component={Terms}/>
                                {/*<Route path="contact" component={ContactUs}/>*/}
                            </Route>
                        </Router>
                    </div>
                </Provider>
            </div>
        )
    }
}
