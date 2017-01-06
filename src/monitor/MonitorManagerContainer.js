import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMonitorListIfNeeded} from './MonitorActions'
import MonitorList from './MonitorList'
class MonitorManagerContainer extends Component {

    componentWillMount() {
        this.props.dispatch(fetchMonitorListIfNeeded());
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Login</h3>
                    </div>
                    <div className="panel-body">
                        <MonitorList monitors={this.props.monitorList}/>
                    </div>
                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        monitorList: state.monitorList
    }
}

export default connect(mapStateToProps)(MonitorManagerContainer)