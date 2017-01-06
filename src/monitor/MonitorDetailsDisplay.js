import React, {PropTypes, Component} from 'react'

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
                {/*<!--<div>-->*/}
                {/*<!--Type: <span ng-bind="monitorTypes[selectedMonitor.type]"></span>-->*/}
                {/*<!--</div>-->*/}
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
                {/*<!--<div>-->*/}
                {/*<!--Uptime: <strike>Unknown</strike>-->*/}
                {/*<!--</div>-->*/}
                {/*<br/>*/}

                {/*<div ng-hide="selectedMonitorEvents.length > 0">*/}
                {/*<h4>Loading...</h4>*/}
                {/*</div>*/}
                {/*<div ng-show="selectedMonitorEvents.length > 0">*/}
                {/*<h4 style="display: inline">Response Time</h4> (ms)*/}
                {/*<div ng-show="selectedMonitorPingChart.data[0]">*/}
                {/*<canvas id="line" class="chart chart-line" width="100" height="30"*/}
                {/*chart-data="selectedMonitorPingChart.data"*/}
                {/*chart-labels="selectedMonitorPingChart.labels"*/}
                {/*chart-click="onClick"*/}
                {/*chart-options="{showXLabels: 5, showTooltips: false, bezierCurve : false, animation: false}">*/}
                {/*</canvas>*/}
                {/*</div>*/}
                {/*<h4>Latest Events</h4>*/}
                {/*<table class="table">*/}
                {/*<tr>*/}
                {/*<th>Status</th>*/}
                {/*<th>Date</th>*/}
                {/*<th>Reason</th>*/}
                {/*<!--<th>Duration</th>-->*/}
                {/*</tr>*/}
                {/*<tr ng-repeat="event in selectedMonitorEvents">*/}
                {/*<td>*/}
                {/*<span ng-show="event.type=='u'">Up</span>*/}
                {/*<span ng-show="event.type=='d'">Down</span>*/}
                {/*<span ng-show="event.type=='p'">Paused</span>*/}
                {/*<span ng-show="event.type=='s'">Started</span>*/}
                {/*</td>*/}
                {/*<td ng-bind="event.date"></td>*/}
                {/*<td ng-bind="event.reason"></td>*/}
                {/*<!--<td><strike>Unknown</strike></td>-->*/}
                {/*</tr>*/}
                {/*</table>*/}
            </div>
        )
    }
}

MonitorDetailsDisplay.propTypes = {
    monitor: PropTypes.object.isRequired,
    monitorIntervals: PropTypes.object.isRequired
};
