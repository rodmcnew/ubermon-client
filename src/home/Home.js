import React, {Component} from 'react'
import LoginFormContainer from '../session/LoginFormContainer'
import CreateAccountFormContainer from '../user/CreateAccountFormContainer'
import EmailHasBeenVerifiedAlertBox from '../user/EmailHasBeenVerifiedAlertBox'
import PasswordHasBeenResetAlertBox from '../user/PasswordHasBeenResetAlertBox'

export default class Home extends Component {
    render() {
        return (
            <div>
                <EmailHasBeenVerifiedAlertBox/>
                <PasswordHasBeenResetAlertBox/>
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
                                <a href="/#/reset-password">Forgot Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
