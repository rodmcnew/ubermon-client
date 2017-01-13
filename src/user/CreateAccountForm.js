import React, {PropTypes, Component} from 'react'
import Recaptcha from 'react-google-recaptcha'
import config from '../config'

export default class CreateAccountForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
        this.state = {email: null, password: null, clientCaptchaRes: null}
    }

    handleEmailChange(event) {
        this.setState(Object.assign({}, this.state, {email: event.target.value}));
    }

    handlePasswordChange(event) {
        this.setState(Object.assign({}, this.state, {password: event.target.value}));
    }

    handleCaptchaChange = function (response) {
        this.setState(Object.assign({}, this.state, {clientCaptchaRes: response}));
    };

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div>
                {!this.props.verificationEmailSent &&
                <form onSubmit={this.handleFormSubmit}>
                    <script src="//www.google.com/recaptcha/api.js?render=explicit&onload=vcRecaptchaApiLoaded" async
                            defer></script>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input onChange={this.handleEmailChange} type="email" className="form-control"
                               id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Create Password:</label>
                        <input onChange={this.handlePasswordChange} type="password" className="form-control"
                               id="pwd"/>
                    </div>
                    <div className="form-group">
                        <Recaptcha
                            sitekey={config.recaptchaPubKey}
                            onChange={this.handleCaptchaChange}
                        />
                        {/*<div vc-recaptcha*/}
                        {/*theme="'light'"*/}
                        {/*key="captcha.key"*/}
                        {/*on-create="captcha.setWidgetId(widgetId)"*/}
                        {/*on-success="captcha.setResponse(response)"*/}
                        {/*on-expire="captcha.cbExpiration()"/>*/}
                    </div>
                    <button type="submit" className="btn btn-primary">Create a Free Account</button>
                    <div>@TODO move ?emailJustVerified redirect to after the # (do on server)</div>
                </form>
                }
                {this.props.verificationEmailSent &&
                <div className="alert alert-success">
                    We sent you a verification email. Please check your email and click the link inside
                    to
                    verify your account.
                </div>
                }
            </div>
        )
    }

}

CreateAccountForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    verificationEmailSent: PropTypes.bool.isRequired
};
