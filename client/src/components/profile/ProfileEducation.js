import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {education.length ? (
        education.map(({ _id, school, from, to, degree, fieldofstudy, description }) => (
          <div key={_id}>
            <h3>{school}</h3>
            <p>
              <Moment date={from} format="YYYY/MM/DD" />
              {' '}-{' '} 
              {to ? <Moment date={to} format="YYYY/MM/DD" /> : 'Now'}
            </p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
          </div>
        ))
      ) : (
        <h4>No education credentials</h4>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileEducation;

