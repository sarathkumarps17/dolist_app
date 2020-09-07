import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToprops)(ProtectedRoute);
