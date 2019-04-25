import React from 'react';
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import PrivateRoute from './PrivateRoute';

/* Public components */
import Homepage from '../imports/ui/Public/Homepage/index';
/* Admin components */
import AdminGames from '../imports/ui/Admin/Games/index';
/* Manage routes */
import UsersList from '../imports/ui/Users/index';
import NewUser from '../imports/ui/Users/NewUser';
import Login from '../imports/ui/Accounts/Login';

import './Container.scss';


const Container = ({ location }) => (
    <TransitionGroup className="body-content">
        <CSSTransition
            key={location.key}
            timeout={{ enter: 240, exit: 240 }}
        >
            <Switch location={location}>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={Login} />

                {/* Admin routes */}
                <PrivateRoute exact path="/admin/games" component={AdminGames} />

                {/* Manage routes */}
                <PrivateRoute exact path="/manage/users" component={UsersList} />
                <PrivateRoute exact path="/manage/users/new" component={NewUser} />
            </Switch>
        </CSSTransition>
    </TransitionGroup>
);

export default withRouter(Container);
