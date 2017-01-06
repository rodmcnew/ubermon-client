import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMonitorList, selectMonitor} from './MonitorActions'
import MonitorList from './MonitorList'
import MonitorDetailsDisplay from './MonitorDetailsDisplay'
class MonitorManagerContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSelectMonitorClick = this.handleSelectMonitorClick.bind(this);
        this.ubermonConfig = { //@TODO move out
            monitorTypes: {
                'h': 'HTTP(s)',
                'p': 'Ping',
                'o': 'Port',
                'k': 'Keyword'
            },
            monitorIntervals: {
                1: 'Every minute',
                2: 'Every 2 minutes',
                5: 'Every 5 minutes',
                10: 'Every 10 minutes',
                15: 'Every 15 minutes',
                20: 'Every 20 minutes',
                30: 'Every 30 minutes',
                60: 'Every 60 minutes'
            },
        }
    }

    componentWillMount() {
        if (!this.props.session) {
            this.props.router.push('/login');
            return;
        }
        this.props.dispatch(fetchMonitorList());
    }

    handleSelectMonitorClick(monitorId) {
        this.props.dispatch(selectMonitor(monitorId));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">My Monitors</h3>
                            </div>
                            <div className="panel-body">
                                <button className="btn btn-default btn-sm"
                                        style={{width: '100%'}}>
                                    <span className="glyphicon glyphicon-plus"/>
                                    &nbsp;
                                    Create new monitor
                                </button>
                                {this.props.monitorList.length !== 0 &&
                                <div>
                                    <br/>
                                    <MonitorList monitors={this.props.monitorList}
                                                 selectedMonitorId={this.props.selectedMonitorId}
                                                 onSelectMonitor={this.handleSelectMonitorClick}/>
                                </div>
                                }

                            </div>
                        </div>
                    </div>
                    {this.props.selectedMonitorId !== null &&
                    <div className="col-sm-8">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Selected Monitor</h3>
                            </div>
                            <div className="panel-body">
                                <MonitorDetailsDisplay monitor={this.props.selectedMonitor}
                                                       monitorIntervals={this.ubermonConfig.monitorIntervals}/>
                                {/*<ubermon-monitor-details-display selected-monitor="selectedMonitor"*/}
                                {/*handle-server-error="handleServerError"*/}
                                {/*monitor-intervals="monitorIntervals">*/}
                                {/*</ubermon-monitor-details-display>*/}
                            </div>
                        </div>
                    </div>
                    }
                    {this.props.monitorList.length === 0 &&
                    <div className="col-sm-8">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Welcome to Ubermon!</h3>
                            </div>
                            <div className="panel-body">
                                <p>
                                    Click "Create new monitor" on the left to get started.
                                </p>
                            </div>
                        </div>
                    </div>
                    }
                </div>

                {/*//*/}
                {/*//*/}
                {/*<ubermon-create-monitor-dialog new-monitor="newMonitor"*/}
                {/*//                                watch-for-pending-update="watchForPendingUpdate"*/}
                {/*//                                monitor-intervals="monitorIntervals"*/}
                {/*//                                select-monitor="selectMonitor"*/}
                {/*//                                monitors="monitors"*/}
                {/*//                                contacts="contacts">*/}
                {/*// </ubermon-create-monitor-dialog>*/}
                {/*//*/}
                {/*// <ubermon-edit-monitor-dialog editable-monitor="editableMonitor"*/}
                {/*//                              watch-for-pending-update="watchForPendingUpdate"*/}
                {/*//                              monitor-intervals="monitorIntervals"*/}
                {/*//                              contacts="contacts">*/}
                {/*// </ubermon-edit-monitor-dialog>*/}
                {/*//*/}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        monitorList: state.monitorList,
        session: state.session,
        selectedMonitorId: state.selectedMonitorId,
        selectedMonitor: state.monitorList.find((monitor)=>monitor.id === state.selectedMonitorId)
    }
}

export default connect(mapStateToProps)(MonitorManagerContainer)