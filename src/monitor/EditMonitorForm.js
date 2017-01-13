import React, {Component} from 'react'

export default class EditMonitorForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.state = {email: null}
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (

            <form role="form" className="ng-pristine ng-valid">
                <div className="alert alert-danger ng-hide">
                    @TODO Implement this form functionality
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                           className="form-control" id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="url">URL</label>
                    <input type="text"
                           className="form-control" id="url"/>
                </div>
                <div className="form-group">
                    <label htmlFor="interval">Monitoring Interval</label>
                    &nbsp;
                    <select defaultValue="5">
                        <option label="Every minute" value="1">Every minute</option>
                        <option label="Every 2 minutes" value="2">Every 2 minutes</option>
                        <option label="Every 5 minutes" value="5">Every 5 minutes</option>
                        <option label="Every 10 minutes" value="10">Every 10 minutes</option>
                        <option label="Every 15 minutes" value="15">Every 15 minutes</option>
                        <option label="Every 20 minutes" value="20">Every 20 minutes</option>
                        <option label="Every 30 minutes" value="30">Every 30 minutes</option>
                        <option label="Every 60 minutes" value="60">Every 60 minutes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Contacts to Alert</label>
                    <div className="ng-scope">
                        <label style={{fontWeight: 'normal'}}>
                            <input type="checkbox" value="1"/>&nbsp;
                            <span className="ng-binding">rodmcnew@gmail.com</span>
                        </label>
                    </div>
                </div>
            </form >
        )
    }
}

// CreateMonitorForm.propTypes = {
//     // onSubmit: PropTypes.func.isRequired,
//     // resetEmailSent: PropTypes.bool.isRequired
// };
