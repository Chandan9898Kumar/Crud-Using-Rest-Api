import React from "react";

import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // Current state
    this.state = { hasError: false };
  }

  /**
   * Getting the derived state from the error
   * @param {*} error
   * @returns
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
  }

  render() {
    // You can render any custom fallback UI
    if (this.state.hasError) {
      return <h1 style={{ color: "red" }}>{this.props.fallback}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
