import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import { Attributes } from './containers/attributes';
import { NewRule } from './containers/new-rule';
import { Rules } from './containers/rules';

export default function Routes() {
  return (
    <Switch>
      <AuthenticatedRoute exact path='/'>
        <Rules />
      </AuthenticatedRoute>

      <UnauthenticatedRoute exact path='/login'>
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path='/signup'>
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path='/attributes'>
        <Attributes />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path='/rule/new'>
        <NewRule />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path='/rule/:id'>
        <NewRule />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
