import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    _id,
    status,
    location,
    company,
    skills,
    user: { _id: user_id, name, avatar }
  }
}) => {
  return (
    <div key={_id} className='profile bg-light'>
      <img className='round-img' src={avatar} alt='avatar' />
      <div>
        <h2>{name}</h2>
        <p>
          {status}
          {company && ` at ${company}`}
        </p>
        <p className='my-1'>{location}</p>
        <Link to={`/profile/${user_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {skills.slice(0, 4).map((skl, i) => (
          <li key={`${skl}_${i}`} className='text-primary'>
            <i className='fas fa-check'></i> {skl}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
