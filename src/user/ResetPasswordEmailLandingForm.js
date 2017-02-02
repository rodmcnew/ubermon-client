import React, {PropTypes, Component} from 'react'

export default class ResetPasswordEmailLandingForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.state = {newPassword: ''}
    }

    handleNewPasswordChange(event) {
        this.setState({newPassword: event.target.value});
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.newPassword);
    }

    render() {
        return (
            <div className="col-sm-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Reset Password</h3>
                    </div>
                    <div className="panel-body">
                        {this.props.succeeded &&
                        <div className="alert alert-success ng-hide">
                            Your password has been changed. You may now <a href="/">login</a>.
                        </div>
                        }
                        {!this.props.succeeded &&
                        <form onSubmit={this.handleFormSubmit}>
                            {this.props.errorMessage &&
                            <div className="alert alert-danger ng-binding ng-hide">
                                {this.props.errorMessage}
                            </div>
                            }
                            <div className="form-group">
                                <label htmlFor="resetPasswordNewPassword">Enter a new password:</label>
                                <input onChange={this.handleNewPasswordChange}
                                       type="password"
                                       required={true}
                                       className="form-control"
                                       id="resetPasswordNewPassword"/>
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

ResetPasswordEmailLandingForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    succeeded: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};
