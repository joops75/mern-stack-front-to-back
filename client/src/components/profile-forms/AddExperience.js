import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperienceEducation } from '../../redux/actions/profile';
import Alert from '../layout/Alert';

const initialState = {
  title: '',
  company: '',
  location: '',
  from: '',
  current: false,
  to: '',
  description: ''
};

const AddExperience = ({ addExperienceEducation, history }) => {
  const [formData, setFormData] = useState(initialState);

  const { title, company, location, from, current, to, description } = formData;

  const onChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperienceEducation({ ...formData, to: current ? '' : to }, history, true);
  };

  return (
    <section className='container'>
      <Alert />
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
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
            Current Job
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
            placeholder='Job Description'
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

AddExperience.propTypes = {
  addExperienceEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addExperienceEducation
};

export default connect(null, mapDispatchToProps)(withRouter(AddExperience));
