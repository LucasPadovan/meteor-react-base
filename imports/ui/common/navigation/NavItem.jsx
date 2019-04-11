import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

export default class NavItem extends PureComponent {
    render() {
        const {
            title,
            to,
            isCurrentSection,
            onClick,
        } = this.props;
        const itemClassName = classNames(
            'nav-item px-4',
            {
                'active': isCurrentSection,
            },
        );

        return (
            <li className={itemClassName}>
                <Link className="nav-link" to={to} onClick={onClick}>{title}</Link>
            </li>
        );
    }
}
