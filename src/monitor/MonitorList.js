import React, {PropTypes, Component} from 'react'

export default class MonitorList extends Component {
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
            <table className="table table-hover">
                <tbody>
                {this.props.monitors.map((monitor, i) =>
                    <tr key={i}
                        onClick={()=>this.props.onSelectMonitor(monitor.id)}
                        style={{cursor: 'pointer'}}
                        className={monitor.id === this.props.selectedMonitorId ? 'active' : ''}>
                        <td>
                            {monitor.up === true &&
                            <span
                                className="text-success glyphicon glyphicon-ok"
                                title="Status: Up"/>
                            }
                            {monitor.up === false &&
                            <span className="text-danger glyphicon glyphicon-remove"
                                  title="Status: Down"/>
                            }
                            {monitor.up === null &&
                            <span className="text-primary glyphicon glyphicon-question-sign"
                                  title="Status: Starting"/>
                            }
                            &nbsp;
                            <span>{monitor.name}</span>

                            <button style={{float: 'right'}}
                                    className="btn btn-default btn-xs">
                                <span className="glyphicon glyphicon-trash" title="Delete"/>
                            </button>
                            <span style={{float: 'right'}}>&nbsp;</span>
                            <button style={{float: 'right'}}
                                    className="btn btn-default btn-xs">
                                <span className="glyphicon glyphicon-edit" title="Edit"/>
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }

}

MonitorList.propTypes = {
    monitors: PropTypes.array.isRequired,
    onSelectMonitor: PropTypes.func.isRequired,
    selectedMonitorId: PropTypes.number
};
