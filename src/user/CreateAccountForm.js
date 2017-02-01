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
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleCaptchaChange = function (response) {
        this.setState({clientCaptchaRes: response});
    };

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div>
                {!this.props.succeeded &&
                <form onSubmit={this.handleFormSubmit}>
                    {this.props.errorMessage &&
                    <div className="alert alert-danger ng-binding ng-hide">
                        {this.props.errorMessage}
                    </div>
                    }
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
                </form>
                }
                {this.props.succeeded &&
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
    succeeded: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};
