import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions/post';

const CommentItem = ({
  comment: { _id, user, avatar, name, text, date },
  post_id,
  deleteComment,
  auth
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='avatar' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment date={date} format='YYYY/MM/DD' />
        </p>
        {user === auth.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => deleteComment(post_id, _id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  post_id: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = { deleteComment };

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
