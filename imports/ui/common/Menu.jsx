import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { PureComponent } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import classNames from 'classnames';

import NavItem from './navigation/NavItem';
import DropdownNavItem from './navigation/DropdownNavItem';
import MenuToggle from './navigation/MenuToggle';

import { auth } from '../utils/authentication';

import './Menu.scss';

const PublicMenu = () => (
    <ul className="navbar-nav">
        <NavItem title="Login" to="/login" />
    </ul>
);

const AdminMenu = ({ onLogoutClick }) => (
    <ul className="navbar-nav">
        <NavItem title="Juegos" to="/admin/games" />
        <NavItem title="Logout" to="/" onClick={onLogoutClick} />
    </ul>
);

const AuthenticatedMenu = ({ user: { username }, onLogoutClick }) => (
    <ul className="navbar-nav">
        <NavItem title={username} to="/" />
        <NavItem title="Logout" to="/" onClick={onLogoutClick} />
    </ul>
);

class Menu extends PureComponent {
    static defaultProps = {
        user: {
            username: ''
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
        };
    }

    _handleOnClick() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    _handleLogout = () => {
        const { history } = this.props;

        auth.signout(() => history.push('/'));
    }

    render() {
        const { user, isAuthenticated } = this.props;
        const { collapsed } = this.state;
        const menuClassName = classNames(
            'collapse navbar-collapse menu',
            {
                'show': collapsed,
            },
        );

        let menuItems = (
            <PublicMenu />
        );

        if (isAuthenticated) {
            menuItems = (
                <AuthenticatedMenu user={user} onLogoutClick={this._handleLogout} />
            );
        }

        return (
            <nav className="navbar navbar-expand navbar-light menu-container">
                <div className="menu-wrapper">
                    <Link className="navbar-brand" to="/">
                        <span className="logo-e pr-2">
                            React
                        </span>
                        <span className="logo-sports">
                            base
                        </span>
                    </Link>

                    <div className={menuClassName} id="navbarSupportedContent">
                        {menuItems}
                    </div>
                </div>
            </nav>
        );
    }
};


const withRouterComponent = withRouter(Menu);

export default withTracker(() => {
    const userId = Meteor.userId();
    const user = Meteor.users.findOne(userId);

    return {
        user,
        isAuthenticated: !!userId,
    };
})(withRouterComponent);
