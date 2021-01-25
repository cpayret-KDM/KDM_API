import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { isUserAuthenticated, getLoggedInUserRole } from '../helpers/authUtils';

// auth
const Login = React.lazy(() => import('../hyper-pages/auth/Login'));
const Logout = React.lazy(() => import('../hyper-pages/auth/Logout'));
const Register = React.lazy(() => import('../hyper-pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../hyper-pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../hyper-pages/auth/Confirm'));

// pages
const LoanDashboard = React.lazy(() => import('../pages/LoanDashboard'));
const LoanDetails = React.lazy(() => import('../pages/LoanDetails'));
const SecurityDashboard = React.lazy(() => import('../pages/SecurityDashboard'));
const SecurityDetails = React.lazy(() => import('../pages/SecurityDetails'));
//const Starter = React.lazy(() => import('../hyper-pages/Starter'));
// const Profile = React.lazy(() => import('../hyper-pages/profile'));
//const ErrorPageNotFound = React.lazy(() => import('../hyper-pages/error/PageNotFound'));
//const ServerError = React.lazy(() => import('../hyper-pages/error/ServerError'));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!isUserAuthenticated()) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
      }

      const userRole = getLoggedInUserRole();
      // check if route is restricted by role

      if (roles && roles.indexOf(userRole) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: '/' }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

// root routes
const rootRoute = {
  path: '/',
  exact: true,
  component: () => <Redirect to="/loans/list" />,
  route: PrivateRoute,
};

// pages
const loanRoutes = {
  path: '/loans',
  name: 'Loans',
  icon: 'uil-copy-alt',
  header: 'Custom',
  children: [
    {
      path: '/loans/list',
      name: 'Dashboard',
      component: (props) => <LoanDashboard {...props} report="list" />,
      route: PrivateRoute,
      roles: ['user', 'admin'],
      exact: true,
    },
    {
      path: '/loans/60-day',
      name: '60 Day Report',
      component: (props) => <LoanDashboard {...props} report="60-day" />,
      route: PrivateRoute,
      roles: ['user', 'admin'],
      exact: true,
    },
    {
      path: '/loans/create',
      name: 'Create Loan',
      component: (props) => <LoanDetails {...props} mode="create" />,
      route: PrivateRoute,
      roles: ['user', 'admin'],
      exact: true,
    },
    {
      path: '/loans/:id/edit',
      name: 'Edit Loan',
      component: (props) => <LoanDetails {...props} mode="edit" />,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: '/loans/:id',
      name: 'Loan Details',
      component: LoanDetails,
      route: PrivateRoute,
      roles: ['user', 'admin'],
      exact: true,
    },
  ],
};

const securityRoutes = {
  path: '/securities',
  name: 'Securities',
  icon: 'uil-copy-alt',
  header: 'Custom',
  children: [
    {
      path: '/securities/list',
      name: 'Dashboard',
      component: (props) => <SecurityDashboard {...props} report="list" />,
      route: PrivateRoute,
      roles: ['user', 'admin'],
      exact: true,
    },
    // {
    //   path: '/securities/60-day',
    //   name: '60 Day Report',
    //   component: (props) => <SecurityDashboard {...props} report="60-day" />,
    //   route: PrivateRoute,
    //   roles: ['user', 'admin'],
    //   exact: true,
    // },
    {
      path: '/securities/create',
      name: 'Create Security',
      component: (props) => <SecurityDetails {...props} mode="create" />,
      route: PrivateRoute,
      roles: ['user', 'admin'],
      exact: true,
    },
    {
      path: '/securities/:id/edit',
      name: 'Edit Security',
      component: (props) => <SecurityDetails {...props} mode="edit" />,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: '/securities/:id',
      name: 'Security Details',
      component: SecurityDetails,
      route: PrivateRoute,
      roles: ['user', 'admin'],
      exact: true,
    },
  ],
};

// auth
const authRoutes = {
  path: '/account',
  name: 'Auth',
  children: [
    {
      path: '/account/login',
      name: 'Login',
      component: Login,
      route: Route,
    },
    {
      path: '/account/logout',
      name: 'Logout',
      component: Logout,
      route: Route,
    },
    {
      path: '/account/register',
      name: 'Register',
      component: Register,
      route: Route,
    },
    {
      path: '/account/confirm',
      name: 'Confirm',
      component: Confirm,
      route: Route,
    },
    {
      path: '/account/forget-password',
      name: 'Forget Password',
      component: ForgetPassword,
      route: Route,
    },
  ],
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
  let flatRoutes = [];

  routes = routes || [];
  routes.forEach(item => {
    flatRoutes.push(item);

    if (typeof item.children !== 'undefined') {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const allRoutes = [rootRoute, authRoutes, loanRoutes, securityRoutes];

const authProtectedRoutes = [loanRoutes, securityRoutes];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allRoutes, authProtectedRoutes, allFlattenRoutes };
