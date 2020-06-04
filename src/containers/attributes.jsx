import React, { useState } from 'react';
import { Attribute } from './attribute';
import { API } from 'aws-amplify';
export function Attributes({}) {
  const [attributes, setAttributes] = useState([]);
  async function onSubmit(attribute) {
    const params = {
      body: attribute,
    };
    if (attribute.id) {
      await API.put('root', `/attribute/${attribute.id}`, params);
    } else {
      await API.post('root', `/attribute`, params);
    }
  }
  function handleClickAdd(e) {
    const attribute = {
      name: 'New Attribute',
      label: 'New Attribute Label',
      type: 'string',
      scope: 'r',
      validation: {
        maxLength: 4,
        minValue: 0,
        maxValue: 1000,
      },
      filterable: true,
      searchable: true,
      sortable: true,
      visible: true,
      required: true,
      editable: true,
    };
    setAttributes([attribute, ...attributes]);
  }
  return (
    <>
      <div className=''>
        <button className='btn btn-primary' onClick={handleClickAdd}>
          ADD ATTRIBUTE
        </button>
      </div>
      {attributes.map((attribute) => {
        return <Attribute {...attribute} key={attribute.id} onSubmit={onSubmit} />;
      })}
    </>
  );
}
