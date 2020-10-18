import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperienceEducation } from '../../redux/actions/profile';
import Alert from '../layout/Alert';

const initialState = {
  school: '',
  degree: '',
  fieldofstudy: '',
  from: '',
  current: false,
  to: '',
  description: ''
};

const AddEducation = ({ addExperienceEducation, history }) => {
  const [formData, setFormData] = useState(initialState);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    current,
    to,
    description
  } = formData;

  const onChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperienceEducation({ ...formData, to: current ? '' : to }, history, false);
  };

  return (
    <section className='container'>
      <Alert />
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              onChange={(e) => onChange(e)}
            />{' '}
            Current School or Bootcamp
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={current}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Program Description'
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard' className='btn btn-light my-1'>
          Go to Dashboard
        </Link>
      </form>
    </section>
  );
};

AddEducation.propTypes = {
  addExperienceEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addExperienceEducation
};

export default connect(null, mapDispatchToProps)(withRouter(AddEducation));
