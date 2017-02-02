import React, {Component, PropTypes} from 'react'

export default class CreateMonitorForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
        this.handleContactCheckChange = this.handleContactCheckChange.bind(this);
        this.state = {name: null, url: null, interval: 5, contactIds: [], type: 'h'}
    }

    handleContactCheckChange(checked, contactId) {
        let newContactIdList = this.state.contactIds.slice();
        if (checked) {
            //If they checked the box, add the contactId to the list for this monitor
            newContactIdList.push(contactId);
        } else {
            //If they unchecked the box, remove the contactId from the list for this monitor
            newContactIdList = newContactIdList.filter(function (currentContactId) {
                return currentContactId !== contactId;
            })
        }
        this.setState({contactIds: newContactIdList});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleUrlChange(event) {
        this.setState({url: event.target.value});
    }

    handleIntervalChange(event) {
        this.setState({interval: event.target.value});
    }

    //@TODO handle contacts change

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <form role="form" onSubmit={this.handleFormSubmit}>
                {this.props.errorMessage &&
                <div className="alert alert-danger">
                    {this.props.errorMessage}
                </div>
                }
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input onChange={this.handleNameChange} type="text"
                           className="form-control" id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="url">URL</label>
                    <input onChange={this.handleUrlChange} type="text"
                           className="form-control" id="url"/>
                </div>
                <div className="form-group">
                    <label htmlFor="interval">Monitoring Interval</label>
                    &nbsp;
                    <select onChange={this.handleIntervalChange} defaultValue="5">
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
                    {this.props.contacts.map((contact, i) =>
                        <div key={i}>
                            <label style={{fontWeight: 'normal'}}>
                                <input type="checkbox" value="1"
                                       onChange={(event) => this.handleContactCheckChange(event.target.checked, contact.id)}/>
                                <span>&nbsp;</span>
                                <span className="ng-binding">{contact.email}</span>
                            </label>
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary pull-right">Save</button>
            </form >
        )
    }
}

CreateMonitorForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    contacts: PropTypes.array.isRequired
};
