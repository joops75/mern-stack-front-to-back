import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { likeUnlike, deletePost } from '../../redux/actions/post';

const PostItem = ({
  match,
  post: { _id, user, avatar, name, text, date, likes, comments },
  auth,
  likeUnlike,
  deletePost,
  history
}) => {
  const onPostsPage = match.path === '/posts';

  return (
    <div key={_id} className='post bg-white p-1 my-1'>
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
        <button
          type='button'
          className='btn btn-light'
          onClick={() => likeUnlike(_id, true)}
        >
          <i className='fas fa-thumbs-up'></i>{' '}
          {likes.length ? <span>{likes.length}</span> : ''}
        </button>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => likeUnlike(_id, false)}
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        {onPostsPage && (
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
        )}
        {auth.user._id === user && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => deletePost(_id, onPostsPage, history)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  likeUnlike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  likeUnlike,
  deletePost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostItem));
