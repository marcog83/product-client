import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import { Attributes } from './containers/attributes';
import { NewRule } from './containers/new-rule';
import { Rules } from './containers/rules';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <UnauthenticatedRoute exact path='/login'>
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path='/signup'>
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path='/attributes'>
        <Attributes />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path='/rules'>
        <Rules />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path='/rule/new'>
        <NewRule />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
