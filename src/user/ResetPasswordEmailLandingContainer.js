import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changePassword} from '../user/userActions'
import ResetPasswordEmailLandingForm from './ResetPasswordEmailLandingForm'
import {withRouter} from 'react-router'

class ResetPasswordEmailLandingFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    //@TODO is the a react router way to to this instead?
    getUrlParameter(param) {
        let sPageURL = window.location.hash,
            sURLVariables = sPageURL.split(/[&||?]/),
            res;

        for (let i = 0; i < sURLVariables.length; i += 1) {
            let paramName = sURLVariables[i],
                sParameterName = (paramName || '').split('=');

            if (sParameterName[0] === param) {
                res = sParameterName[1];
            }
        }
        return res;
    }

    handleFormSubmit(newPassword) {
        this.props.dispatch(changePassword(
            this.getUrlParameter('userId'), newPassword, this.getUrlParameter('access_token')
        ));
    }

    render() {
        return (<ResetPasswordEmailLandingForm onSubmit={this.handleFormSubmit}
                                               errorMessage={this.props.errorMessage}
                                               succeeded={this.props.succeeded}/>)
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.resetPasswordEmailLandingForm.errorMessage,
        succeeded: state.resetPasswordEmailLandingForm.succeeded
    }
}

export default connect(mapStateToProps)(withRouter(ResetPasswordEmailLandingFormContainer))
