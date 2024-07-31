import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.scss';
import API from './lib/API';
import { Actions } from './redux/actions';
import store, { localDispatcher, persistor } from './redux/store';
import { useTokens } from './util/funcs';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

const refreshAccessToken = async () => {
  const { data } = await API.post('users/refreshToken', {
    currentRefreshToken: useTokens().refreshToken,
  });
  localDispatcher(data, Actions.SET_TOKENS);
  return data;
};

API.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken } = useTokens();

    config.headers = {
      Authorization: accessToken,
      'x-refresh': refreshToken,
    } as any;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  //By default, we are forwarding the response as-is
  (response) => response,
  //But here we define the error handler
  async function (error) {
    // The configuration for the request that just failed:
    const failedRequest = error.config;

    if (
      // If unauthorized, let's try to refresh the tokens...
      error.response.status === 401 &&
      // but won't retry if the failed request was already attempting to refresh the tokens
      failedRequest.url !== '/users/refreshToken'
    ) {
      await refreshAccessToken();

      return API(failedRequest);
    } else {
      return Promise.reject(error);
    }
  }
);
