import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profile';
import Alert from '../layout/Alert';

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile
}) => {
  useEffect(() => {
    if (!profile) getCurrentProfile();
  }, [profile, getCurrentProfile]);

  return loading ? (
    <Spinner />
  ) : (
    <section className='container'>
      <Alert />
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>You haven't yet set up a profile. Please add some info.</p>
          <Link to='create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = { getCurrentProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
