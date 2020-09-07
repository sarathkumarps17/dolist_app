import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className="alert">
      <div className={`alert-${alert.alertType}`}>{alert.msg}</div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapPropsToState = (state) => ({
  alerts: state.alert,
});

export default connect(mapPropsToState)(Alert);
