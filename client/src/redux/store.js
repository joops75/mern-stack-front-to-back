import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const initalState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentTokenValue = store.getState().auth.token;

const handleTokenChange = () => {
  let previousTokenValue = currentTokenValue;
  currentTokenValue = store.getState().auth.token;

  if (previousTokenValue !== currentTokenValue) {
    setAuthToken(currentTokenValue);
  }
};

store.subscribe(handleTokenChange);

export default store;
