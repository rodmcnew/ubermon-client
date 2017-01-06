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
                                    pingData={this.props.selectedMonitorPingData}/>
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
        selectedMonitor: state.monitorList.find((monitor) => monitor.id === state.selectedMonitorId),
        selectedMonitorPingData: [
            {
                "id": 25068132,
                "date": "2017-01-06T22:19:37.000Z",
                "latency": 669,
                "monitorId": 42
            }, {"id": 25068062, "date": "2017-01-06T22:18:37.000Z", "latency": 1037, "monitorId": 42}, {
                "id": 25067982,
                "date": "2017-01-06T22:17:37.000Z",
                "latency": 879,
                "monitorId": 42
            }, {"id": 25067912, "date": "2017-01-06T22:16:37.000Z", "latency": 885, "monitorId": 42}, {
                "id": 25067822,
                "date": "2017-01-06T22:15:37.000Z",
                "latency": 739,
                "monitorId": 42
            }, {"id": 25067752, "date": "2017-01-06T22:14:37.000Z", "latency": 801, "monitorId": 42}, {
                "id": 25067682,
                "date": "2017-01-06T22:13:37.000Z",
                "latency": 919,
                "monitorId": 42
            }, {"id": 25067602, "date": "2017-01-06T22:12:37.000Z", "latency": 745, "monitorId": 42}, {
                "id": 25067532,
                "date": "2017-01-06T22:11:37.000Z",
                "latency": 820,
                "monitorId": 42
            }, {"id": 25067442, "date": "2017-01-06T22:10:37.000Z", "latency": 703, "monitorId": 42}, {
                "id": 25067362,
                "date": "2017-01-06T22:09:37.000Z",
                "latency": 809,
                "monitorId": 42
            }, {"id": 25067302, "date": "2017-01-06T22:08:37.000Z", "latency": 771, "monitorId": 42}, {
                "id": 25067222,
                "date": "2017-01-06T22:07:37.000Z",
                "latency": 676,
                "monitorId": 42
            }, {"id": 25067152, "date": "2017-01-06T22:06:37.000Z", "latency": 699, "monitorId": 42}, {
                "id": 25067062,
                "date": "2017-01-06T22:05:37.000Z",
                "latency": 786,
                "monitorId": 42
            }, {"id": 25066992, "date": "2017-01-06T22:04:37.000Z", "latency": 815, "monitorId": 42}, {
                "id": 25066922,
                "date": "2017-01-06T22:03:37.000Z",
                "latency": 762,
                "monitorId": 42
            }, {"id": 25066842, "date": "2017-01-06T22:02:37.000Z", "latency": 0, "monitorId": 42}, {
                "id": 25066772,
                "date": "2017-01-06T22:01:37.000Z",
                "latency": 732,
                "monitorId": 42
            }, {"id": 25066682, "date": "2017-01-06T22:00:37.000Z", "latency": 840, "monitorId": 42}],
        selectedMonitorEvents: [{
            "id": 3432,
            "date": "2016-12-16T02:18:38.000Z",
            "type": "u",
            "reason": "Returned 200",
            "alertSent": true,
            "monitorId": 42
        }, {
            "id": 3412,
            "date": "2016-12-16T02:16:38.000Z",
            "type": "d",
            "reason": "Returned 504",
            "alertSent": true,
            "monitorId": 42
        }, {
            "id": 3402,
            "date": "2016-12-16T02:14:38.000Z",
            "type": "u",
            "reason": "Returned 200",
            "alertSent": true,
            "monitorId": 42
        }, {
            "id": 3372,
            "date": "2016-12-16T02:13:07.000Z",
            "type": "d",
            "reason": "Returned 504",
            "alertSent": true,
            "monitorId": 42
        }, {
            "id": 3352,
            "date": "2016-12-15T20:28:38.000Z",
            "type": "u",
            "reason": "Returned 200",
            "alertSent": true,
            "monitorId": 42
        }, {
            "id": 3332,
            "date": "2016-12-15T20:23:38.000Z",
            "type": "d",
            "reason": "Returned 504",
            "alertSent": true,
            "monitorId": 42
        }, {
            "id": 3322,
            "date": "2016-12-15T19:30:38.000Z",
            "type": "u",
            "reason": "Returned 200",
            "alertSent": true,
            "monitorId": 42
        }, {
            "id": 3312,
            "date": "2016-12-15T19:29:37.000Z",
            "type": "d",
            "reason": "Returned 504",
            "alertSent": true,
            "monitorId": 42
        }, {
            "id": 3302,
            "date": "2016-12-15T19:28:38.000Z",
            "type": "u",
            "reason": "Returned 200",
            "alertSent": true,
            "monitorId": 42
        }, {
            "id": 3292,
            "date": "2016-12-15T19:26:38.000Z",
            "type": "d",
            "reason": "Returned 504",
            "alertSent": true,
            "monitorId": 42
        }]
    }
}

export default connect(mapStateToProps)(MonitorManagerContainer)
