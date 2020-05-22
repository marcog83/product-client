import React, { useState } from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { useAppContext } from '../libs/contextLib';
import { Auth } from 'aws-amplify';
import { onError } from '../libs/errorLib';
import { useFormFields } from '../libs/hooksLib';
import './Login.css';

import LoaderButton from '../components/LoaderButton';

export default function Login() {
  const { userHasAuthenticated } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId='email'>
          <FormLabel>Email</FormLabel>
          <FormControl
            autoComplete='username'
            autoFocus
            type='email'
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            autoComplete='current-password'
            value={fields.password}
            onChange={handleFieldChange}
            type='password'
          />
        </FormGroup>
        <LoaderButton block type='submit' isLoading={isLoading} disabled={!validateForm()}>
          Login
        </LoaderButton>
      </form>
    </div>
  );
}
