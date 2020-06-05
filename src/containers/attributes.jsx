import React, { useState, useEffect } from 'react';
import { Attribute } from './attribute';
import { API } from 'aws-amplify';
export function Attributes({}) {
  const [attributes, setAttributes] = useState([]);
  useEffect(() => {
    async function getAttributes() {
      const attributes = await API.get('root', '/attributes');
      setAttributes(attributes);
    }
    getAttributes();
  }, []);

  async function onSubmit({ uuid, ...attribute }) {
    const params = {
      body: attribute,
    };
    let newRecord;
    if (attribute.id) {
      newRecord = await API.put('root', `/attribute/${attribute.id}`, params);
    } else {
      newRecord = await API.post('root', `/attribute`, params);
      setAttributes((attributes) => {
        return attributes.map((attribute) => {
          if (attribute.uuid === uuid) {
            return newRecord;
          } else {
            return attribute;
          }
        });
      });
    }
  }

  async function onRemove(id) {
    const newAttributes = attributes.filter((attribute) => id !== attribute.id);
    setAttributes(newAttributes);
    await API.del('root', `/attribute/${id}`);
  }

  function handleClickAdd(e) {
    const attribute = {
      uuid: window.performance.now(),
      name: '',
      label: '',
      type: 'string',
      domain: 'r',
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
        const key = attribute.id || 'new';
        const handleRemove = attribute.id ? () => onRemove(attribute.id) : null;
        return <Attribute onRemove={handleRemove} {...attribute} key={key} onSubmit={onSubmit} />;
      })}
    </>
  );
}
