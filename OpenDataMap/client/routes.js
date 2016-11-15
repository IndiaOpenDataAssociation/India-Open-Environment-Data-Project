/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import Dashboard from './modules/Dashboard/Dashboard'
import About from './modules/About/About'
import Community from './modules/Community/Community'
import Openapi from './modules/Openapi/Openapi'
import Device from './modules/Device/Device'
import Partner from './modules/Partners/Partners'
import Airowl from './modules/Airowl/Airowl'
import Map from './modules/Map/index'
// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Dashboard/Dashboard');
  // require('./modules/Post/pages/PostDetailPage/PostDetailPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, Dashboard);
        });
      }}
    />

    <Route
      path="/about"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null,About);
        });
      }}
    />

    <Route
      path="/community"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null,Community);
        });
      }}
    />

    <Route
      path="/openapi"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null,Openapi);
        });
      }}
    />

    <Route
      path="/devices"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null,Device);
        });
      }}
    />

    <Route
      path="/partners"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null,Partner);
        });
      }}
    />

    <Route
      path="/airowl"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null,Airowl);
        });
      }}
    />

    <Route
      path="/demo"
      getComponent = {(nextState, cb) => {
        require.ensure([], require => {
          cb(null,Map);
        });
      }}
    />

  </Route>
);
