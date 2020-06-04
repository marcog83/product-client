import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

export function RuleItem({ id, name, scope, context, description }) {
  return (
    <LinkContainer to={`/rule/${id}`}>
      <div className='list-group-item list-group-item-action'>
        <div className='d-flex w-100 justify-content-between'>
          <h5 className='font-weight-bold mb-1'>{name}</h5>
          <div>
            <small className='ml-2 text-info'>{scope}</small>
            <small className='ml-2 text-info'>{context}</small>
          </div>
        </div>
        <p className='mb-1'>{description}</p>
      </div>
    </LinkContainer>
  );
}
