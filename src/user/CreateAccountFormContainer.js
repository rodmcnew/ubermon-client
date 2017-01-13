import React, {Component} from 'react'
import {connect} from 'react-redux'
import {create} from './UserActions'
import CreateAccountForm from './CreateAccountForm'
import {withRouter} from 'react-router'

class CreateAccountFormContainer extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {verificationEmailSent: false};
    }

    handleFormSubmit(credentials) {
        this.props.dispatch(create(credentials))
            .then(() => {
                this.setState({verificationEmailSent: true});
            });
    }

    render() {
        return (<CreateAccountForm onSubmit={this.handleFormSubmit}
                                   verificationEmailSent={this.state.verificationEmailSent}/>)
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(withRouter(CreateAccountFormContainer))
