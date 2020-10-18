import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperienceEducation} from '../../redux/actions/profile'
import { connect } from 'react-redux';

function Experience({ experience, deleteExperienceEducation }) {
  const exps = experience.map(
    ({ _id, title, company, location, from, current, to, description }) => (
      <tr key={_id}>
        <td>{company}</td>
        <td className='hide-sm'>{title}</td>
        <td className='hide-sm'>
          <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
          {to ? <Moment format='YYYY/MM/DD'>{to}</Moment> : 'Now'}
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteExperienceEducation(_id, true)}>Delete</button>
        </td>
      </tr>
    )
  );

  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>{exps}</tbody>
      </table>
    </>
  );
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperienceEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteExperienceEducation
};

export default connect(null, mapDispatchToProps)(Experience);
