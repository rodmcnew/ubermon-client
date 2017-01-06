import React, {PropTypes, Component} from 'react'

export default class MonitorList extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {email: null, password: null}
    }

    handleEmailChange(event) {
        this.setState(Object.assign({}, this.state, {email: event.target.value}));
    }

    handlePasswordChange(event) {
        this.setState(Object.assign({}, this.state, {password: event.target.value}));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <table className="table table-sm">
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Url</th>
                </tr>
                {this.props.monitors.map((monitor, i) =>
                    <tr key={i}>
                        <td>
                            {monitor.id}
                        </td>
                        <td>
                            {monitor.name}
                        </td>
                        <td>
                            {monitor.url}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }

}

MonitorList.propTypes = {
    monitors: PropTypes.array.isRequired,
};
