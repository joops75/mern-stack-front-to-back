import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../redux/actions/profile'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profile';
import Alert from '../layout/Alert';

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  deleteAccount
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
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </>
      ) : (
        <>
          <p>You haven't yet set up a profile. Please add some info.</p>
          <Link to='create-edit-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}

      <div className="my-2">
        <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <i className="fas fa-user-minus"></i> Delete My Account
        </button>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = { getCurrentProfile, deleteAccount };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
