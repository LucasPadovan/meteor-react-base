import React, { PureComponent } from 'react';

export default class Card extends PureComponent {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
