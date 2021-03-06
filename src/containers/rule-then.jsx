import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function RuleThen({
  onRemove,
  onChange,
  onAddCondition,
  onRemoveCondition,
  attributeId,
  conditions,
  attributes,
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
                <label className='input-group-text'>Then:</label>
              </div>

              <select onChange={onChange} name={`${prefix}.attributeId`} value={attributeId} className='form-control'>
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
        {conditions.map(({ property, operator, value }, index) => {
          return (
            <div key={index} className='row'>
              <div className='col'>
                <div className='form-group'>
                  <label>property</label>
                  <select
                    name={`${prefix}.conditions.${index}.property`}
                    onChange={onChange}
                    className='form-control'
                    value={property}>
                    <option value='config.disabled'>disabled</option>
                    <option value='config.required'>required</option>
                    <option value='config.visible'>visible</option>
                    <option value='config.editable'>editable</option>
                    <option value='config.searchable'>searchable</option>
                    <option value='config.filterable'>filterable</option>
                    <option value='config.sortable'>sortable</option>
                  </select>
                </div>
              </div>
              <div className='col'>
                <div className='form-group'>
                  <label>operator</label>
                  <select
                    name={`${prefix}.conditions.${index}.operator`}
                    onChange={onChange}
                    value={operator}
                    className='form-control'>
                    <option value='equal'>Equal</option>
                  </select>
                </div>
              </div>
              <div className='col'>
                <div className='form-group'>
                  <label>Value</label>
                  <input
                    name={`${prefix}.conditions.${index}.value`}
                    value={value}
                    onChange={onChange}
                    className='form-control'></input>
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
