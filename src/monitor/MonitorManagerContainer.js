import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    fetchMonitorList,
    selectMonitor,
    fetchMonitorPings,
    fetchMonitorEvents,
    deleteMonitor,
    createMonitor,
    updateMonitor
} from './MonitorActions'
import {fetchContacts} from '../contact/contactActions'
import MonitorList from './MonitorList'
import MonitorDetailsDisplay from './MonitorDetailsDisplay'
import MonitorDetailsForm from './MonitorDetailsForm'

class MonitorManagerContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSelectMonitorClick = this.handleSelectMonitorClick.bind(this);
        this.handleShowCreateNewMonitorFormClick = this.handleShowCreateNewMonitorFormClick.bind(this);
        this.handleMonitorEditClick = this.handleMonitorEditClick.bind(this);
        this.handleDeleteMonitorConfirm = this.handleDeleteMonitorConfirm.bind(this);
        this.handleCreateMonitorSubmit = this.handleCreateMonitorSubmit.bind(this);
        this.handleMonitorEditSubmit = this.handleMonitorEditSubmit.bind(this);
        this.state = {mode: 'display'};
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
            this.props.router.push('/');
            return;
        }
        this.props.dispatch(fetchMonitorList());
        this.props.dispatch(fetchContacts());
    }

    handleSelectMonitorClick(monitorId) {
        this.selectMonitor(monitorId);
        this.setState({mode: 'display'});
    }

    handleShowCreateNewMonitorFormClick() {
        this.setState({mode: 'new'});
    }

    handleMonitorEditClick(monitorId) {
        this.selectMonitor(monitorId);
        this.setState({mode: 'edit'});
    }

    selectMonitor(monitorId) {
        const dispatch = this.props.dispatch;
        dispatch(selectMonitor(monitorId));
        dispatch(fetchMonitorEvents(monitorId));
        dispatch(fetchMonitorPings(monitorId));
    }


    handleDeleteMonitorConfirm(monitorId) {
        const dispatch = this.props.dispatch;
        dispatch(deleteMonitor(monitorId))
            .then(() => dispatch(fetchMonitorList()))
    }

    handleCreateMonitorSubmit(monitorData) {
        const dispatch = this.props.dispatch;
        let self = this;
        dispatch(createMonitor(monitorData, () => {
            dispatch(fetchMonitorList()).then(() => {
                self.setState({mode: 'display'});
            })
        }))
    }

    handleMonitorEditSubmit(monitorData) {
        const dispatch = this.props.dispatch;
        let self = this;
        dispatch(updateMonitor(monitorData, () => {
            dispatch(fetchMonitorList()).then(() => {
                self.setState({mode: 'display'});
            })
        }))
    }

    getNewMonitor() {
        return {
            name: '',
            url: 'https://',
            interval: 5,
            contactIds: [],
            type: 'h'
        }
    }

    render() {
        let view = this.state.mode;
        if (this.props.monitorList.length === 0) {
            view = 'new';
        }
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">My Monitors</h3>
                            </div>
                            <div className="panel-body">
                                <button onClick={this.handleShowCreateNewMonitorFormClick}
                                        className="btn btn-default btn-sm"
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
                                        onSelectMonitor={this.handleSelectMonitorClick}
                                        onEditMonitor={this.handleMonitorEditClick}
                                        onDeleteMonitor={this.handleDeleteMonitorConfirm}/>
                                </div>
                                }

                            </div>
                        </div>
                    </div>
                    {view === 'new' &&
                    <div className="col-sm-8">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Create New Monitor</h3>
                            </div>
                            <div className="panel-body">
                                <MonitorDetailsForm onSubmit={this.handleCreateMonitorSubmit}
                                                    errorMessage={this.props.createMonitorFormErrorMessage}
                                                    contacts={this.props.contacts}
                                                    monitor={this.getNewMonitor()}/>
                            </div>
                        </div>
                    </div>
                    }
                    {view === 'display' && this.props.selectedMonitor &&
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
                    {view === 'edit' &&
                    <div className="col-sm-8">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Edit Monitor</h3>
                            </div>
                            <div className="panel-body">
                                <MonitorDetailsForm onSubmit={this.handleMonitorEditSubmit}
                                                    errorMessage={this.props.editMonitorFormErrorMessage}
                                                    contacts={this.props.contacts}
                                                    monitor={this.props.selectedMonitor}/>
                            </div>
                        </div>
                    </div>
                    }
                </div>
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
        selectedMonitorEvents: state.monitor.events[monitorId] || [],
        createMonitorFormErrorMessage: state.createMonitorForm.errorMessage,
        contacts: state.contacts,
        editMonitorFormErrorMessage: state.editMonitorForm.errorMessage
    }
}

export default connect(mapStateToProps)(MonitorManagerContainer)
