import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login} from '../session/SessionActions'
import LoginForm from './LoginForm'
import {withRouter} from 'react-router'

class LoginFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(credentials) {
        this.props.dispatch(login(credentials))
            .then(() => {
                this.props.router.push('/dashboard')
            });
    }

    render() {
        return (<LoginForm onSubmit={this.handleFormSubmit}/>)
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(withRouter(LoginFormContainer))
