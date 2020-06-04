import React from 'react';
export function RuleWhenCondition({ onChange, value, operator, prefix }) {
  return (
    <div className='row'>
      <div className='col'>
        <div className='form-group'>
          <label>operator</label>
          <select onChange={onChange} value={operator} name={`${prefix}.operator`} className='form-control'>
            <option>Exist</option>
            <option>Empty</option>
            <option>Equal</option>
            <option>Not Empty</option>            
            <option>Not equal</option>
            <option>Greater Than</option>
            <option>Greater or Equal</option>
            <option>Less Than</option>            
            <option>Less or Equal</option>
          </select>
        </div>
      </div>
      <div className='col'>
        <div className='form-group'>
          <label>Value</label>
          <input onChange={onChange} value={value} name={`${prefix}.value`} className='form-control'></input>
        </div>
      </div>
    </div>
  );
}
