import React, {Component} from 'react'
import {connect} from 'react-redux'
import {resetPassword} from '../user/userActions'
import ResetPasswordForm from './ResetPasswordForm'
import {withRouter} from 'react-router'

class ResetPasswordFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(credentials) {
        this.props.dispatch(resetPassword(credentials, () => {
            this.setState({resetEmailSent: true});
        }))
    }

    render() {
        return (<ResetPasswordForm onSubmit={this.handleFormSubmit}
                                   errorMessage={this.props.errorMessage}
                                   succeeded={this.props.succeeded}/>)
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.resetPasswordForm.errorMessage,
        succeeded: state.resetPasswordForm.succeeded
    }
}

export default connect(mapStateToProps)(withRouter(ResetPasswordFormContainer))
