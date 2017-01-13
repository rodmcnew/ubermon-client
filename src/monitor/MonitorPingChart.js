import React, {PropTypes, Component} from 'react'
import {Line} from 'react-chartjs'

export default class MonitorPingChart extends Component {
    formatPingData(pings) {
        let pingChart = {
            data: [],
            labels: []
        };
        pings.forEach(function (ping) {
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
                    // pointColor: "rgba(220,220,220,1)",
                    // pointStrokeColor: "#fff",
                    // pointHighlightFill: "#fff",
                    // pointHighlightStroke: "rgba(220,220,220,1)",
                    fillColor: "#f5f5f5",
                    strokeColor: "#337ab7",
                    data: pingChart.data
                }
            ]
        };
    }

    render() {
        return (
            <Line
                data={this.formatPingData(this.props.pings)}
                options={{showXLabels: 5, showTooltips: false, bezierCurve: false, animation: false}}
                width="605"
                height="181"/>
        )
    }
}

MonitorPingChart.propTypes = {
    pings: PropTypes.array.isRequired,
};
