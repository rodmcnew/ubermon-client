import React, {Component} from 'react'

export default class EmailHasBeenVerifiedAlertBox extends Component {
    render() {
        let showAlert = window.location.href.indexOf('emailJustVerified') !== -1;
        return (
            <div>
                {showAlert &&
                <div className="alert alert-success">
                    Your email has been verified. You may now login below.
                </div>
                }
            </div>
        )
    }

}
