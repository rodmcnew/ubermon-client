import React, {PropTypes, Component} from 'react'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {email: null, password: null}
    }

    handleEmailChange(event) {
        this.setState(Object.assign({}, this.state, {email: event.target.value}));
    }

    handlePasswordChange(event) {
        this.setState(Object.assign({}, this.state, {password: event.target.value}));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input onChange={this.handleEmailChange} type="email" className="form-control" id="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input onChange={this.handlePasswordChange} type="password" className="form-control"
                           id="pwd"/>
                </div>
                <button type="submit" className="btn btn-default">Login</button>
            </form>
        )
    }

}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};