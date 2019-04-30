import React, { PureComponent } from 'react';

import './InputField.scss';


export default class InputField extends PureComponent {
    render() {
        return (
            <div className="input-container">
                <input {...this.props} />
            </div>
        );
    }
}
