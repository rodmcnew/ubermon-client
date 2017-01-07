import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMonitorList, selectMonitor, fetchMonitorPings, fetchMonitorEvents} from './MonitorActions'
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

    componentWillReceiveProps(newProps) {
        //Select the first monitor if none is selected and we have at least one
        if (!newProps.selectedMonitorId && newProps.monitorList.length !== 0) {
            this.selectMonitor(newProps.monitorList[0].id)
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
        this.selectMonitor(monitorId)
    }

    selectMonitor(monitorId) {
        const {dispatch} = this.props;
        dispatch(selectMonitor(monitorId));
        dispatch(fetchMonitorEvents(monitorId));
        dispatch(fetchMonitorPings(monitorId));
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
                                    <MonitorList
                                        monitors={this.props.monitorList}
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
                                <MonitorDetailsDisplay
                                    monitor={this.props.selectedMonitor}
                                    monitorIntervals={this.ubermonConfig.monitorIntervals}
                                    events={this.props.selectedMonitorEvents}
                                    pings={this.props.selectedMonitorPings}/>
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
    const monitorId = state.monitor.selectedMonitorId;
    return {
        session: state.session,
        monitorList: state.monitor.list,
        selectedMonitorId: monitorId,
        selectedMonitor: state.monitor.list.find((monitor) => monitor.id === monitorId),
        selectedMonitorPings: state.monitor.pings[monitorId] || [],
        selectedMonitorEvents: state.monitor.events[monitorId] || []
    }
}

export default connect(mapStateToProps)(MonitorManagerContainer)
