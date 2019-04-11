import React, { PureComponent } from 'react';

import './Pill.scss';

export default class Pill extends PureComponent {
    render() {
        return (
            <div className="pill">
                <div className="pill__text">
                    {this.props.text}
                </div>
            </div>
        );
    }
}
