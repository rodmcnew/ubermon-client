import React, {Component} from 'react'
import {connect} from 'react-redux'
import {resetPassword} from '../user/UserActions'
import ResetPasswordForm from './ResetPasswordForm'
import {withRouter} from 'react-router'

class ResetPasswordFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {resetEmailSent: false};
    }

    handleFormSubmit(credentials) {
        this.props.dispatch(resetPassword(credentials))
            .then(() => {
                this.setState({resetEmailSent: true});
            });
    }

    render() {
        return (<ResetPasswordForm onSubmit={this.handleFormSubmit} resetEmailSent={this.state.resetEmailSent}/>)
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(withRouter(ResetPasswordFormContainer))
