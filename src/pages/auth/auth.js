import locationHelperBuilder from '@/hoc/auth/history4/locationHelper';
import { connectedRouterRedirect } from '@/hoc/auth/history4/redirect';
import connectedAuthWrapper from '@/hoc/auth/connectedAuthWrapper';
import AuthWrapper from '@/hoc/auth/authWrapper';

import Loading from './components/Loading';

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.user.data !== null,
  authenticatingSelector: state => state.user.isLoading,
  wrapperDisplayName: 'UserIsAuthenticated',
};

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/login',
});

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.data !== null && state.user.data.isAdmin,
  predicate: user => user.isAdmin,
  wrapperDisplayName: 'UserIsAdmin',
});

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => state.user.data === null && state.user.isLoading === false,
  wrapperDisplayName: 'UserIsNotAuthenticated',
};

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/protected',
  allowRedirectBack: false,
});

export const adminOnly = AuthWrapper({
  LoadingComponent: Loading,
});

export const adminOnlyRedux = connectedAuthWrapper({
  authenticatedSelector: state => state.user.isAdmin,
});
