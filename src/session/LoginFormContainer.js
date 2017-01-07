import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login} from '../session/SessionActions'
import LoginForm from './LoginForm'

class LoginFormContainer extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(credentials) {
        this.props.dispatch(login(credentials))
            .then(()=> {
                this.props.router.push('/dashboard')
            });
    }

    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Login</h3>
                </div>
                <div className="panel-body">
                    <LoginForm onSubmit={this.handleFormSubmit}/>
                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(LoginFormContainer)