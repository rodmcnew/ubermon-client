import React, {Component} from 'react'
import LoginFormContainer from '../session/LoginFormContainer'
import CreateAccountFormContainer from '../user/CreateAccountFormContainer'
import EmailHasBeenVerifiedAlertBox from '../user/EmailHasBeenVerifiedAlertBox'

export default class Home extends Component {
    render() {
        return (
            <div>
                {/*<div className="row">*/}
                {/*<div className="col-sm-12">*/}
                {/*/!* @TODO move me inside each form *!/*/}
                {/*<div className="alert alert-danger" ng-bind="error" ng-show="error"/>*/}
                {/*<div className="alert alert-success" ng-show="emailJustVerified">*/}
                {/*Your email has been verified. You may now login below.*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                <EmailHasBeenVerifiedAlertBox/>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Create a Free Account</h3>
                            </div>
                            <div className="panel-body">
                                <p>
                                    Ubermon watches your website and sends you an alert if it goes down.
                                </p>
                                <p>
                                    Others charge for checks faster than every 5 minutes. We check your website once a
                                    minute for free.
                                </p>
                                Free account includes:
                                <ul>
                                    <li>50 monitors</li>
                                    <li>Checks run every minute</li>
                                    <li>Email alerts (Email to SMS is allowed)</li>
                                    {/*<li>Email-to-SMS alerts</li>*/}
                                </ul>
                                <CreateAccountFormContainer/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Login</h3>
                            </div>
                            <div className="panel-body">
                                <LoginFormContainer/>
                                <br/>
                                <a href="/reset-password">@TODO Forgot Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
