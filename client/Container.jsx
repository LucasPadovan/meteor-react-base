import React from 'react';
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import DsIndex from 'ds/app/index';

import PrivateRoute from './PrivateRoute';

/* Public components */
import Homepage from '../imports/ui/Public/Homepage/index';
/* Admin components */
import AdminGames from '../imports/ui/Admin/Games/index';

/* Manage routes */
import UsersList from '../imports/ui/Users/index';
import NewUser from '../imports/ui/Users/NewUser';
import Login from '../imports/ui/Accounts/Login';
import RecoverPassword from '../imports/ui/Accounts/RecoverPassword';
import SignIn from '../imports/ui/Accounts/SignIn';

import './Container.scss';

// Guides say to use location.key here but that triggers a re-render of the same component. Using location.pathname prevents this completely.
const Container = ({ location }) => (
    <TransitionGroup className="body-content">
        <CSSTransition
            key={location.pathname}
            timeout={{ enter: 250, exit: 250 }}
        >
            <Switch location={location}>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/recover-password" component={RecoverPassword} />

                {/* Admin routes */}
                <PrivateRoute exact path="/admin/games" component={AdminGames} />

                {/* Manager routes */}
                <PrivateRoute exact path="/manager/users" component={UsersList} />
                <PrivateRoute exact path="/manager/users/new" component={NewUser} />
                <PrivateRoute exact path="/manager/ds" component={DsIndex} />
            </Switch>
        </CSSTransition>
    </TransitionGroup>
);

export default withRouter(Container);
