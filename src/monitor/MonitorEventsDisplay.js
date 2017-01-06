import React, {PropTypes, Component} from 'react'

export default class MonitorDetailsDisplay extends Component {
    getEventTypeDescription(event) {
        const typeDescriptions = {
            u: 'Up',
            d: 'Down',
            p: 'Paused',
            s: 'Started'
        };
        return typeDescriptions[event.type];
    }

    render() {
        const events = this.props.events;
        return (
            <table className="table">
                <tbody>
                <tr>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Reason</th>
                    {/*<!--<th>Duration</th>-->*/}
                </tr>
                {events.map((event, i) =>
                    <tr key={i}>
                        <td>
                            {this.getEventTypeDescription(event.type)}
                        </td>
                        <td>{event.date}</td>
                        <td>{event.reason}</td>
                        {/*<td><strike>Unknown</strike></td>*/}
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
}

MonitorDetailsDisplay.propTypes = {
    events: PropTypes.array.isRequired,
};
