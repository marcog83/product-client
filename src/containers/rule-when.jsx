import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RuleWhenCondition } from './rule-when-condition';
import { RuleWhenLogical } from './rule-when-logical';

export function RuleWhen({
  onRemove,
  onChange,
  onAddCondition,
  onRemoveCondition,
  attributes,
  attributeId,
  conditions,
  prefix,
}) {
  return (
    <div className='bd-example row'>
      <button type='button' onClick={onRemove} className='close-btn close position-absolute' aria-label='Close'>
        <span aria-hidden='true'>&times;</span>
      </button>
      <div className='col'>
        <div className='row mb-2'>
          <div className='col'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <label className='input-group-text'>When:</label>
              </div>

              <select value={attributeId} onChange={onChange} name={`${prefix}.attributeId`} className='form-control'>
                {attributes.map((attribute) => {
                  return (
                    <option key={attribute.id} value={attribute.id}>
                      {attribute.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        {conditions.map(({ type, payload }, i) => {
          switch (type) {
            case 'condition':
              return (
                <RuleWhenCondition
                  key={i}
                  prefix={`${prefix}.conditions.${i}.payload`}
                  {...payload}
                  onChange={onChange}
                />
              );
            case 'logical':
              return (
                <RuleWhenLogical
                  key={i}
                  prefix={`${prefix}.conditions.${i}.payload`}
                  value={payload}
                  onChange={onChange}
                />
              );
          }
        })}

        <div className='row'>
          <div className='col d-flex justify-content-end mt-2'>
            <button onClick={onAddCondition} className='btn btn-primary'>
              <FontAwesomeIcon icon='plus' />
            </button>
            <button onClick={onRemoveCondition} className='btn btn-danger'>
              <FontAwesomeIcon icon='minus' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className='row'>
          <div className='col-2 align-self-end mb-2'>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name='gridRadios' value='option1' checked />
              <label className='form-check-label'>AND</label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name='gridRadios' value='option1' checked />
              <label className='form-check-label'>OR</label>
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label>operator</label>
              <select onChange={onChange} name='operator' className='form-control'>
                <option>Equal</option>
                <option>Greater Than</option>
                <option>Lesser Than</option>
              </select>
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label>Value</label>
              <input onChange={onChange} name='value' className='form-control'></input>
            </div>
          </div>
        </div> */
}
