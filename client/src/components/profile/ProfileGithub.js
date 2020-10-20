import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../redux/actions/profile';

const ProfileGithub = ({ githubusername, repos, getGithubRepos }) => {
  useEffect(() => {
    getGithubRepos(githubusername)
  }, [getGithubRepos, githubusername]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos.map(({ id, name, html_url, description, stargazers_count, watchers_count, forks_count }) => (
        <div key={id} className="repo bg-white p-1 my-1">
          <div>
            <h4><a href={html_url} target="_blank"
                rel="noopener noreferrer">{name}</a></h4>
            <p>{description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">Stars: {stargazers_count}</li>
              <li className="badge badge-dark">Watchers: {watchers_count}</li>
              <li className="badge badge-light">Forks: {forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  githubusername: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos
});

const mapDispatchToProps = {
  getGithubRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);

