import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function RuleThen({
  onRemove,
  onChange,
  onAddCondition,
  onRemoveCondition,
  attribute,
  conditions,

  prefix,
}) {
  return (
    <div className='bd-example row'>
      <button type='button' onClick={onRemove} class='close-btn close position-absolute' aria-label='Close'>
        <span aria-hidden='true'>&times;</span>
      </button>
      <div className='col'>
        <div className='row mb-2'>
          <div className='col'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <label className='input-group-text'>Then:</label>
              </div>

              <select onChange={onChange} name={`${prefix}.attribute`} value={attribute} className='form-control'>
                <option>Attribute 1</option>
                <option>Attribute 2</option>
                <option>Attribute 3</option>
                <option>Attribute 4</option>
              </select>
            </div>
          </div>
        </div>
        {conditions.map(({ property, operator, value },index) => {
          return (
            <div className='row'>
              <div className='col'>
                <div className='form-group'>
                  <label>property</label>
                  <select name={`${prefix}.conditions.${index}.property`} onChange={onChange} className='form-control' value={property}>
                    <option>disabled</option>
                    <option>required</option>
                    <option>visible</option>
                    <option>editable</option>
                    <option>searchable</option>
                    <option>filterable</option>
                    <option>sortable</option>
                  </select>
                </div>
              </div>
              <div className='col'>
                <div className='form-group'>
                  <label>operator</label>
                  <select name={`${prefix}.conditions.${index}.operator`} onChange={onChange} value={operator} className='form-control'>
                    <option>Equal</option>
                  </select>
                </div>
              </div>
              <div className='col'>
                <div className='form-group'>
                  <label>Value</label>
                  <input name={`${prefix}.conditions.${index}.value`} value={value} onChange={onChange} className='form-control'></input>
                </div>
              </div>
            </div>
          );
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
