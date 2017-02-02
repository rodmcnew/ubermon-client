import React, {PropTypes, Component} from 'react'

export default class MonitorList extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {email: null, password: null}
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleDeleteClick(monitor) {
        if (confirm('Delete monitor ' + monitor.name + '?')) {
            this.props.onDeleteMonitor(monitor.id);
        }
    }

    render() {
        return (
            <table className="table table-hover">
                <tbody>
                {this.props.monitors.map((monitor, i) =>
                    <tr key={i}
                        onClick={() => this.props.onSelectMonitor(monitor.id)}
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

                            <button onClick={(event) => {
                                event.stopPropagation();
                                this.handleDeleteClick(monitor)
                            }}
                                    style={{float: 'right'}}
                                    className="btn btn-default btn-xs">
                                <span className="glyphicon glyphicon-trash" title="Delete"/>
                            </button>
                            <span style={{float: 'right'}}>&nbsp;</span>
                            <button onClick={(event) => {
                                event.stopPropagation();
                                this.props.onEditMonitor(monitor.id)
                            }} style={{float: 'right'}}
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
    selectedMonitorId: PropTypes.number,
    onEditMonitor: PropTypes.func.isRequired,
    onDeleteMonitor: PropTypes.func.isRequired
};
