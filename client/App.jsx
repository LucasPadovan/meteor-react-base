import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Layout from '../imports/ui/common/layouts/Layout';

/* Public components */
import Homepage from '../imports/ui/Public/Homepage/index';
/* Admin components */
import AdminGames from '../imports/ui/Admin/Games/index';
{/* Manage routes */}
import UsersList from '../imports/ui/Users/index';
import NewUser from '../imports/ui/Users/NewUser';
import Login from '../imports/ui/Accounts/Login';

import PrivateRoute from './PrivateRoute';


const Routes = () => (
    <Router>
        <Switch>
            <Layout>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={Login} />

                {/* Admin routes */}
                <PrivateRoute exact path="/admin/games" component={AdminGames} />

                {/* Manage routes */}
                <PrivateRoute exact path="/manage/users" component={UsersList} />
                <PrivateRoute exact path="/manage/users/new" component={NewUser} />
            </Layout>
        </Switch>
    </Router>
);

export default Routes;
