import React from 'react';
import PropTypes from 'prop-types';

export function withLoading(WrappedComponent) {
  function WithLoadingComponent({ isLoading, ...rest }) {
    if (isLoading) {
      return <div className="card">Loading...</div>;
    }
    return <WrappedComponent {...rest} />;
  }

  WithLoadingComponent.displayName = `WithLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  WithLoadingComponent.propTypes = {
    isLoading: PropTypes.bool,
  };

  return WithLoadingComponent;
}
