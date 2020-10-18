import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperienceEducation} from '../../redux/actions/profile'
import { connect } from 'react-redux';

function Education({ education, deleteExperienceEducation }) {
  const exps = education.map(
    ({ _id, school, degree, fieldofstudy, from, current, to, description }) => (
      <tr key={_id}>
        <td>{school}</td>
        <td className='hide-sm'>{degree}</td>
        <td className='hide-sm'>
          <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
          {to ? <Moment format='YYYY/MM/DD'>{to}</Moment> : 'Now'}
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteExperienceEducation(_id, false)}>Delete</button>
        </td>
      </tr>
    )
  );

  return (
    <>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>{exps}</tbody>
      </table>
    </>
  );
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteExperienceEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteExperienceEducation
};

export default connect(null, mapDispatchToProps)(Education);
