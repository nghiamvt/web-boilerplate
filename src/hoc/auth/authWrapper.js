import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

/**
 * Hiding or displaying different elements depending on the user's permissions.
 */

// Parameters of HOC
const defaultParams = {
  LoadingComponent: () => null, // show loading while authenticating
  FailureComponent: () => null, // show this component when unauthenticated
  wrapperDisplayName: 'AuthWrapper',
};

/**
 * Usage
 * const VisibleOnlyAdmin = authWrapper(defaultParams)(ProtectedComponent);
 * <VisibleOnlyAdmin isAuthenticated={true} isAuthenticating={false} />
 */
export default (args) => {
  const { LoadingComponent, FailureComponent, wrapperDisplayName } = {
    ...defaultParams,
    ...args,
  };

  return (DecoratedComponent) => {
    const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    class UserAuthWrapper extends Component {
      static displayName = `${wrapperDisplayName}(${displayName})`;

      static propTypes = {
        isAuthenticated: PropTypes.bool,
        isAuthenticating: PropTypes.bool,
      };

      static defaultProps = {
        isAuthenticated: false,
        isAuthenticating: false,
      };

      render() {
        const { isAuthenticated, isAuthenticating } = this.props;
        if (isAuthenticated) {
          return <DecoratedComponent {...this.props} />;
        } if (isAuthenticating) {
          return <LoadingComponent {...this.props} />;
        }
        return <FailureComponent {...this.props} />;
      }
    }

    return hoistStatics(UserAuthWrapper, DecoratedComponent);
  };
};
