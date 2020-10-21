import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post';

const CommentForm = ({ post_id, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(post_id, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  post_id: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapDispatchToProps = { addComment };

export default connect(null, mapDispatchToProps)(CommentForm);
