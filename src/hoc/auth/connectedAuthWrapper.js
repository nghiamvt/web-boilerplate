import { connect } from 'react-redux';
import authWrapper from './authWrapper';

/**
 * Connect authWrapper to Redux Store
 */

const defaultParams = {
  authenticatingSelector: () => false, // store selector indicates loading while authenticating
  authenticatedSelector: () => false, // store selector indicates the user is authenticated
};

/**
 * Usage
 * const VisibleOnlyAdmin = connectedAuthWrapper(defaultParams)(ProtectedComponent);
 * <VisibleOnlyAdmin isAuthenticated={true} isAuthenticating={false} />
 */
export default args => {
  const { authenticatedSelector, authenticatingSelector } = {
    ...defaultParams,
    ...args,
  };

  return DecoratedComponent =>
    connect((state, ownProps) => ({
      isAuthenticated: authenticatedSelector(state, ownProps),
      isAuthenticating: authenticatingSelector(state, ownProps),
    }))(authWrapper(args)(DecoratedComponent));
};
