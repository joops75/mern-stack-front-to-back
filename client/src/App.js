import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateEditProfile from './components/profile-forms/CreateEditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';

import './App.css';

const App = () => {
  // useEffect with empty array as second argument is equivalent to componentDidMount
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
            exact
            path='/create-edit-profile'
            component={CreateEditProfile}
          />
          <PrivateRoute
            exact
            path='/add-experience'
            component={AddExperience}
          />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
          <PrivateRoute exact path='/posts' component={Posts} />
          <PrivateRoute exact path='/posts/:id' component={Post} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
