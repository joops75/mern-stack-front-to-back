import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByUserId } from '../../redux/actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ match, auth, profile: { profile, loading }, getProfileByUserId }) => {
  useEffect(() => {
    getProfileByUserId(match.params.id);
  }, [getProfileByUserId, match.params.id]);

  return (
    <section className="container">
      <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
      {loading || !profile ? (
        <Spinner />
      ) : (
        <>
          {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && (
            <Link to="/create-edit-profile" className="btn btn-dark">Edit Profile</Link>
          )}
          
          <div className="profile-grid my-1">
            {/* <!-- Top --> */}
            <ProfileTop profile={profile} />
    
            {/* <!-- About --> */}
            <ProfileAbout profile={profile} />
    
            {/* <!-- Experience --> */}
            <ProfileExperience profile={profile} />
    
            {/* <!-- Education --> */}
            <ProfileEducation profile={profile} />
    
            {/* <!-- Github --> */}
            { profile.githubusername && (
              <ProfileGithub githubusername={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </section>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = {
  getProfileByUserId
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
