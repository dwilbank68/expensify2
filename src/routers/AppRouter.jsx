import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import PrivateRoute from './PrivateRoute.jsx';
import PrivateRouteAddressRequired from './PrivateRouteAddressRequired.jsx';
import PublicRoute from './PublicRoute.jsx';

import AddExpensePage from '../components/AddExpensePage.jsx';
import EditExpensePage from '../components/EditExpensePage.jsx';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.jsx';
import LoginPage from '../components/LoginPage.jsx';
import SignupPage from '../components/SignupPage.jsx';
import NotFoundPage from '../components/NotFoundPage.jsx';
import UserEditPage from '../components/UserEditPage.jsx';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact/>
                <PrivateRouteAddressRequired path="/dashboard" component={ExpenseDashboardPage} exact/>
                <PrivateRouteAddressRequired path="/create" component={AddExpensePage}/>
                <PrivateRouteAddressRequired path="/edit/:id" component={EditExpensePage}/>
                <PublicRoute path="/signup" component={SignupPage}/>
                <PrivateRoute path="/user_edit/:id" component={UserEditPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
)

export default AppRouter;