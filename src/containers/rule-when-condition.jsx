import React from 'react';
export function RuleWhenCondition({ onChange, value, operator, prefix }) {
  return (
    <div className='row'>
      <div className='col'>
        <div className='form-group'>
          <label>operator</label>
          <select onChange={onChange} value={operator} name={`${prefix}.operator`} className='form-control'>
            <option value='exists'>Exists</option>
            <option value='empty'>Empty</option>
            <option value='equal'>Equal</option>
            <option value='not.empty'>Not Empty</option>
            <option value='not.equal'>Not equal</option>
            <option value='greater'>Greater Than</option>
            <option value='greaterEq'>Greater or Equal</option>
            <option value='less'>Less Than</option>
            <option value='lessEq'>Less or Equal</option>
          </select>
        </div>
      </div>
      <div className='col'>
        {!['exists', 'empty', 'not.empty'].includes(operator) && (
          <div className='form-group'>
            <label>Value</label>
            <input onChange={onChange} value={value} name={`${prefix}.value`} className='form-control'></input>
          </div>
        )}
      </div>
    </div>
  );
}
