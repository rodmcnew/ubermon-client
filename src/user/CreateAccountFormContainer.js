import React, {Component} from 'react'
import {connect} from 'react-redux'
import {create} from './userActions'
import CreateAccountForm from './CreateAccountForm'
import {withRouter} from 'react-router'

class CreateAccountFormContainer extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(credentials) {
        this.props.dispatch(create(credentials));
    }

    render() {
        return (<CreateAccountForm onSubmit={this.handleFormSubmit}
                                   succeeded={this.props.succeeded}
                                   errorMessage={this.props.errorMessage}/>)
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.createAccountForm.errorMessage, succeeded: state.createAccountForm.succeeded}
}

export default connect(mapStateToProps)(withRouter(CreateAccountFormContainer))
