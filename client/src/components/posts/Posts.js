import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostItem from './PostItem';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/post';
import Alert from '../layout/Alert';
import Spinner from '../layout/Spinner';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className='container'>
      <Alert />
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>

      <PostForm />

      <div className='posts'>
        {loading ? (
          <Spinner />
        ) : (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </section>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

const mapDispatchToProps = {
  getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
