import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  (alerts &&
    alerts.length &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))) ||
  null; // return null if no alerts so that default undefined return is not coerced into printing a '0'

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  // state contains state pieces defined in the root reducer in client\src\redux\reducers\index.js
  alerts: state.alert
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
