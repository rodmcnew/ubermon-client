import React, {PropTypes, Component} from 'react'
import MonitorEventsDisplay from './MonitorEventsDisplay'
import MonitorPingChart from './MonitorPingChart'
export default class MonitorDetailsDisplay extends Component {
    getStatusDescription(monitor) {
        if (monitor.up === true) {
            return 'Up';
        } else if (monitor.up === false) {
            return 'Down';
        } else if (monitor.up === null) {
            return 'Starting'
        } else {
            throw new Error('Invalid value in monitor.up')
        }
    }

    render() {
        const monitor = this.props.monitor;

        return (
            <div>
                <div>
                    Name: {monitor.name}
                </div>
                <div>
                    URL: {monitor.url}
                </div>
                <div>
                    Status: {this.getStatusDescription(monitor)}
                </div>
                <div>
                    Monitoring Interval: {this.props.monitorIntervals[monitor.interval]}
                </div>
                <br/>
                <h4 style={{display: 'inline'}}>Response Time</h4> (ms)
                <MonitorPingChart pings={this.props.pings}/>
                <h4>Latest Events</h4>
                <MonitorEventsDisplay events={this.props.events}/>
            </div>
        )
    }
}

MonitorDetailsDisplay.propTypes = {
    monitor: PropTypes.object.isRequired,
    monitorIntervals: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    pings: PropTypes.array.isRequired
};
