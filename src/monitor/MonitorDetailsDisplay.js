import React, {PropTypes, Component} from 'react'
import MonitorEventsDisplay from './MonitorEventsDisplay'
import {Line} from 'react-chartjs'
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

    formatPingData(res) {
        let pingChart = {
            data: [],
            labels: []
        };
        res.forEach(function (ping) {
            pingChart.data.unshift(ping.latency);
            let date = new Date(ping.date);
            let minutes = date.getMinutes().toString();
            if (minutes.length === 1) {
                minutes = '0' + minutes;
            }
            pingChart.labels.unshift(date.getHours() + ':' + minutes);
        });
        //Fix 1 point charts which don't display properly
        if (pingChart.data.length === 1) {
            pingChart.data.unshift(pingChart.data[0]);
            pingChart.labels.unshift(pingChart.labels[0]);
        }
        return {
            labels: pingChart.labels,
            datasets: [
                {
                    // label: "My First dataset",
                    // fillColor: "rgba(220,220,220,0.2)",
                    // strokeColor: "rgba(220,220,220,1)",
                    // pointColor: "rgba(220,220,220,1)",
                    // pointStrokeColor: "#fff",
                    // pointHighlightFill: "#fff",
                    // pointHighlightStroke: "rgba(220,220,220,1)",
                    data: pingChart.data
                }
            ]
        };
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
                <h4 style={{display: 'inline'}}>Response Time</h4> (ms)
                <div>@TODO this is fake data</div>
                <Line
                    data={this.formatPingData(this.props.pingData)}
                    options={{showXLabels: 5, showTooltips: false, bezierCurve: false, animation: false}}
                    width="605"
                    height="181"/>
                <h4>Latest Events</h4>
                <div>@TODO this is fake data</div>
                <MonitorEventsDisplay events={this.props.events}/>
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
    monitorIntervals: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    pingData: PropTypes.array.isRequired
};
