import React from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node,
  };

  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="card" style={{ margin: '2rem' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
