import React from 'react';
import { useFormFields } from '../libs/hooksLib';

export function Attribute({ onSubmit, onRemove, ...props }) {
  const [fields, handleFieldChange] = useFormFields(props);
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(fields);
  }
  return (
    <form onSubmit={handleSubmit} className={`bd-example attribute ${fields.id ? '' : 'new-attribute'}`}>
      <div className='row'>
        <div className='col'>
          <div className='form-group'>
            <label>Name</label>
            <input
              className='form-control'
              placeholder='type a name...'
              onChange={handleFieldChange}
              name='attrName'
              required
              value={fields.attrName}></input>
          </div>
        </div>
        <div className='col'>
          <div className='form-group'>
            <label>Label</label>
            <input
              className='form-control'
              onChange={handleFieldChange}
              name='label'
              placeholder='type a label...'
              required
              value={fields.label}
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='form-group'>
            <label>Type</label>
            <select className='form-control' onChange={handleFieldChange} name='type' value={fields.type}>
              <option value='string'>String</option>
              <option value='number'>Number</option>
              <option value='date'>Date</option>
              <option value='input-range'>Input Range</option>
            </select>
          </div>
        </div>
        <div className='col'>
          <div className='form-group'>
            <label>Domain</label>
            <select className='form-control' onChange={handleFieldChange} name='domain' value={fields.domain}>
              <option value='r'>R</option>
              <option value='m'>M</option>
              <option value='a'>A</option>
            </select>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <div className='form-check form-check-inline'>
            <input
              className='mb-2 form-check-input'
              onChange={handleFieldChange}
              type='checkbox'
              name='required'
              checked={fields.required}
              value={fields.required}
            />
            <label>Required</label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='mb-2 form-check-input'
              onChange={handleFieldChange}
              type='checkbox'
              name='filterable'
              checked={fields.filterable}
              value={fields.filterable}
            />
            <label>Filterable</label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='mb-2 form-check-input'
              onChange={handleFieldChange}
              type='checkbox'
              name='searchable'
              checked={fields.searchable}
              value={fields.searchable}
            />
            <label>Searchable</label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='mb-2 form-check-input'
              onChange={handleFieldChange}
              type='checkbox'
              name='sortable'
              checked={fields.sortable}
              value={fields.sortable}
            />
            <label>Sortable</label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='mb-2 form-check-input'
              onChange={handleFieldChange}
              type='checkbox'
              name='editable'
              checked={fields.editable}
              value={fields.editable}
            />
            <label>Editable</label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='mb-2 form-check-input'
              onChange={handleFieldChange}
              type='checkbox'
              name='visible'
              checked={fields.visible}
              value={fields.visible}
            />
            <label>Visible</label>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='form-group'>
            <label>Validation maxLength</label>
            <input
              className='form-control'
              onChange={handleFieldChange}
              type='number'
              name='validation.maxLength'
              value={fields.validation.maxLength}></input>
          </div>
        </div>
        <div className='col'>
          <div className='form-group'>
            <label>Validation minValue</label>
            <input
              className='form-control'
              onChange={handleFieldChange}
              type='number'
              name='validation.minValue'
              value={fields.validation.minValue}></input>
          </div>
        </div>
        <div className='col'>
          <div className='form-group'>
            <label>Validation maxValue</label>
            <input
              className='form-control'
              onChange={handleFieldChange}
              type='number'
              name='validation.maxValue'
              value={fields.validation.maxValue}></input>
          </div>
        </div>
      </div>
      <div className=''>
        <button className='btn btn-primary' type='submit'>
          {fields.id ? 'UPDATE' : 'SAVE'}
        </button>
        <button className='btn btn-danger' onClick={onRemove}>
          DELETE
        </button>
      </div>
    </form>
  );
}
