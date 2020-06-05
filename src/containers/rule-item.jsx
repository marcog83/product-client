import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Domains, Contexts } from '../utils/domains';

export function RuleItem({ id, name, domain, context, description }) {
  const dLabel = (Domains.find(({ value }) => value === domain) || { label: '' }).label;
  const cLabel = (Contexts.find(({ value }) => value === context) || { label: '' }).label;
  return (
    <LinkContainer to={`/rule/${id}`}>
      <div className='list-group-item list-group-item-action'>
        <div className='d-flex w-100 justify-content-between'>
          <h5 className='font-weight-bold mb-1'>{name}</h5>
          <div>
            <small className='ml-2 text-info'>{dLabel}</small>
            <small className='ml-2 text-info'>{cLabel}</small>
          </div>
        </div>
        <p className='mb-1'>{description}</p>
      </div>
    </LinkContainer>
  );
}
