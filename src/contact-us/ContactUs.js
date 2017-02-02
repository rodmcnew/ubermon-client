import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'
import config from '../config'

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.state = {sent: false, errorMessage: null, body: null, message: null};

    }

    handleBodyChange(event) {
        this.setState({body: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.setState({errorMessage: null});
        fetch(config.apiBase + '/Contacts/sendMessageToAdmin', {
            method: 'POST',
            body: JSON.stringify({body: this.state.body, email: this.state.email}),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            response.json().then((body) => {
                switch (response.status) {
                    case 200:
                        this.setState({sent: true});
                        break;
                    case 500://The server returns 500 for bad requests on this API. This needs fixed on server to 400
                    case 400:
                        this.setState({errorMessage: 'Something was missing or invalid on the form.'});
                        break;
                    default:
                        throw new Error('Unexpected status code received from server');
                }
            })
        }).catch(reason => {
            this.setState({
                errorMessage: 'Could not communicate with the server. Check your internet connection and try again.'
            });
            throw reason;
        })
    }

    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Contact us</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.handleFormSubmit}>
                        {this.state.errorMessage &&
                        <div className="alert alert-danger">
                            {this.state.errorMessage}
                        </div>
                        }
                        {this.state.sent &&
                        <div className="alert alert-success">
                            Your message has been sent.
                        </div>
                        }
                        {!this.state.sent &&
                        <div>
                            <div className="form-group">
                                <label htmlFor="email">Your email address:</label>
                                <input onChange={this.handleEmailChange}
                                       type="email"
                                       className="form-control"
                                       id="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea onChange={this.handleBodyChange}
                                          className="form-control"
                                          id="message"
                                          style={{height: '10em'}}/>
                            </div>
                            <div className="form-group" style={{textAlign: 'right'}}>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                        </div>
                        }
                    </form>
                </div>
            </div>
        )
    }
}
