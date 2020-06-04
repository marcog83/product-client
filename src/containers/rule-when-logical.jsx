import React from 'react';
export function RuleWhenLogical({ onChange, value, prefix }) {
  return (
    <div className='row'>
      <div className='col-2 align-self-end mb-2'>
        <div className='form-check'>
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
        <div className='form-check'>
          <input
            className='form-check-input'
            onChange={onChange}
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
