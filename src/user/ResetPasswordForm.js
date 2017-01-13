import React, {PropTypes, Component} from 'react'

export default class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.state = {email: null}
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div className="col-sm-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Reset Password</h3>
                    </div>
                    <div className="panel-body">
                        {this.props.resetEmailSent &&
                        <div className="alert alert-success ng-hide">
                            We sent you a password reset email. Please check your email and click the link
                            inside to
                            reset you password.
                        </div>
                        }
                        {!this.props.resetEmailSent &&
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="alert alert-danger ng-binding ng-hide">
                                @TODO show email not found error here
                            </div>
                            <div className="form-group">
                                <label htmlFor="resetPasswordEmail">Email address:</label>
                                <input onChange={this.handleEmailChange} type="email"
                                       className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                                       id="resetPasswordEmail"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Reset Password</button>
                        </form>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

ResetPasswordForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    resetEmailSent: PropTypes.bool.isRequired
};
