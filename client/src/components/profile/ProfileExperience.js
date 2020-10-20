import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {experience.length ? (
        experience.map(({ _id, company, from, to, title, description }) => (
          <div key={_id}>
            <h3 className="text-dark">{company}</h3>
            <p>
              <Moment date={from} format="YYYY/MM/DD" />
              {' '}-{' '} 
              {to ? <Moment date={to} format="YYYY/MM/DD" /> : 'Now'}
            </p>
            <p><strong>Position: </strong>{title}</p>
            <p><strong>Description: </strong>{description}</p>
          </div>
        ))) : (
        <h4>No experience credentials</h4>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileExperience;
