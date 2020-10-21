import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/post';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ match, post: { post, loading }, getPost }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return (
    <section className='container'>
      <Alert />
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      {loading || !post ? (
        <Spinner />
      ) : (
        <>
          <PostItem post={post} />

          <CommentForm post_id={post._id} />

          <div className='comments'>
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                post_id={post._id}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

const mapDispatchToProps = {
  getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
