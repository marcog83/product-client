import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function RuleLogicalOperator({ prefix, onChange, value }) {
  return (
    <div className='bd-example row'>
      <div className='col'>
        <div className='form-check-inline form-check'>
          <input
            onChange={onChange}
            className='form-check-input'
            type='radio'
            name={prefix}
            value='AND'
            checked={value === 'AND'}
          />
          <label className='form-check-label'>AND</label>
        </div>
        <div className='form-check-inline form-check'>
          <input
            onChange={onChange}
            className='form-check-input'
            type='radio'
            name={prefix}
            value='OR'
            checked={value === 'OR'}
          />
          <label className='form-check-label'>OR</label>
        </div>
      </div>
    </div>
  );
}
