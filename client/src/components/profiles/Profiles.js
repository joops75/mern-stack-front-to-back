import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../redux/actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <section className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length ? (
              profiles.map((prof) => (
                <ProfileItem key={prof._id} profile={prof} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </section>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getAllProfiles
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
