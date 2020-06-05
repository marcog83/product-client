import React, { useEffect, useState } from 'react';
import { RuleWhen } from './rule-when';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RuleThen } from './rule-then';
import { RuleLogicalOperator } from './rule-logical-operator';
import { useFormFields } from '../libs/hooksLib';
import { useParams, useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import { onError } from '../libs/errorLib';
import { Domains, Contexts } from '../utils/domains';

const NEW_WHEN_CONDITION = () => ({
  type: 'condition',
  payload: {
    operator: 'equal',
    value: 'true',
  },
});
const NEW_WHEN_LOGICAL = () => ({
  type: 'logical',
  payload: 'AND',
});
const NEW_LOGICAL = () => ({
  type: 'logical',
  payload: 'AND',
});

const NEW_WHEN = () => ({
  type: 'when',
  payload: {
    attributeId: '',
    conditions: [NEW_WHEN_CONDITION()],
  },
});

const NEW_THEN_CONDITION = () => ({
  property: 'config.enabled',
  operator: 'equal',
  value: 'true',
});

const NEW_THEN = () => {
  return {
    attributeId: '',
    conditions: [NEW_THEN_CONDITION()],
  };
};

export function NewRule(props) {
  const { id } = useParams();
  const history = useHistory();
  const [fields, setFields, setValues] = useFormFields(null);
  const [attributes, setAttributes] = useState([]);
  useEffect(() => {
    function loadRule() {
      return API.get('root', `/rule/${id}`);
    }

    async function onLoad() {
      try {
        const rule = await loadRule();

        setValues(rule);
      } catch (e) {
        onError(e);
      }
    }
    if (!!id) {
      onLoad();
    } else {
      const newRule = {
        name: '',
        description: '',
        conditions: [NEW_WHEN()],
        then: [NEW_THEN()],
      };
      setValues(newRule);
    }
  }, [id, setValues]);

  useEffect(() => {
    async function getAttributes() {
      const attributes = await API.get('root', '/attributes');
      setAttributes(attributes);
    }
    getAttributes();
  }, []);

  function addNewWhen() {
    const conditionsLength = fields.conditions.length;
    let conditions = [NEW_LOGICAL(), NEW_WHEN()];
    if (!conditionsLength) {
      conditions = [NEW_WHEN()];
    }
    const values = {
      ...fields,
      conditions: [...fields.conditions, ...conditions],
    };
    setValues(values);
  }

  function addNewThen() {
    const values = {
      ...fields,
      then: [...fields.then, NEW_THEN()],
    };
    setValues(values);
  }

  function onRemoveWhen(index) {
    const conditions = [...fields.conditions];
    let count = 2;
    let startAt = index;
    if (index > 0) {
      startAt -= 1;
    }
    conditions.splice(startAt, count);

    const values = {
      ...fields,
      conditions,
    };
    setValues(values);
  }
  function onRemoveThen(index) {
    const then = [...fields.then];
    then.splice(index, 1);
    const values = {
      ...fields,
      then,
    };
    setValues(values);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(fields);
    const params = {
      body: fields,
    };
    let newRecord;
    if (!!id) {
      try {
        await API.put('root', `/rule/${id}`, params);
        history.push('/');
      } catch (e) {
        onError(e);
      }
    } else {
      try {
        await API.post('root', `/rule`, params);
        history.push('/');
      } catch (e) {
        onError(e);
      }
    }
  }

  return (
    !!fields && (
      < >
        <div className='bd-example rule-header'>
          <div className='row'>
            <div className='col d-flex justify-content-between w-100'>
              <div className='form-group flex-grow-1'>
                <label htmlFor='name'>Rule Name</label>
                <input value={fields.name} onChange={setFields} id='name' className='form-control' name='name' />
              </div>
              <div className='align-items-center d-flex mt-3'>
                <button onClick={handleSubmit} className='btn btn-primary ml-2'>SAVE</button>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div className='bd-example'>
              <div className='row'>
                <div className='col'>
                  <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                      rows='10'
                      id='description'
                      className='form-control'
                      value={fields.description}
                      onChange={setFields}
                      name='description'></textarea>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  <div className='form-group'>
                    <label>Domain</label>
                    <select className='form-control' value={fields.domain} onChange={setFields} name='domain'>
                      <option value=''>Choose a Domain...</option>
                      {Domains.map(({ value, label }) => {
                        return (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label>Context</label>
                    <select className='form-control' value={fields.context} onChange={setFields} name='context'>
                      <option value=''>Choose a Context...</option>
                      {Contexts.map(({ value, label }) => {
                        return (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-8'>
            <div className='bd-example'>
              {fields.conditions.map(({ type, payload }, i) => {
                if (type === 'when') {
                  return (
                    <RuleWhen
                      key={i}
                      {...payload}
                      attributes={attributes}
                      prefix={`conditions.${i}.payload`}
                      onAddCondition={() => {
                        const length = payload.conditions.length;
                        let newCondition = [NEW_WHEN_LOGICAL(), NEW_WHEN_CONDITION()];
                        if (length == 0) {
                          newCondition = [NEW_WHEN_CONDITION()];
                        }
                        const newPayload = {
                          ...payload,
                          conditions: [...payload.conditions, ...newCondition],
                        };

                        setValues({
                          ...fields,
                          conditions: fields.conditions.map(({ type, payload }, index) => {
                            if (index === i) {
                              return { type, payload: newPayload };
                            } else {
                              return { type, payload };
                            }
                          }),
                        });
                      }}
                      onRemoveCondition={() => {
                        setValues({
                          ...fields,
                          conditions: fields.conditions.map((condition, index) => {
                            if (index === i) {
                              const count = 2;
                              let startAt = fields.conditions[i].payload.conditions.length - 1;
                              if (startAt > 0) {
                                startAt -= 1;
                              }
                              const conditions = [...fields.conditions[i].payload.conditions];
                              conditions.splice(startAt, count);
                              return {
                                ...condition,
                                payload: {
                                  ...condition.payload,
                                  conditions,
                                },
                              };
                            } else {
                              return condition;
                            }
                          }),
                        });
                      }}
                      onChange={setFields}
                      onRemove={() => onRemoveWhen(i)}
                    />
                  );
                }
                if (type === 'logical') {
                  return (
                    <RuleLogicalOperator
                      value={payload}
                      key={payload.id}
                      prefix={`conditions.${i}.payload`}
                      onChange={setFields}
                    />
                  );
                }
              })}
              <div className='row'>
                <div className='col d-flex justify-content-end mb-2 mt-1'>
                  <button onClick={addNewWhen} className='btn btn-primary'>
                    <FontAwesomeIcon icon='plus' /> ADD NEW WHEN
                  </button>
                  {/* <button className='btn btn-danger'>
                  <FontAwesomeIcon icon='minus' />
                </button> */}
                </div>
              </div>
              {fields.then.map((props, i) => {
                return (
                  <RuleThen
                    key={i}
                    {...props}
                    attributes={attributes}
                    onAddCondition={() => {
                      const newPayload = {
                        ...props,
                        conditions: [...props.conditions, NEW_THEN_CONDITION()],
                      };

                      setValues({
                        ...fields,
                        then: fields.then.map((then, index) => {
                          if (index === i) {
                            return newPayload;
                          } else {
                            return then;
                          }
                        }),
                      });
                    }}
                    onRemoveCondition={() => {
                      const conditions = [...props.conditions];
                      const startAt = conditions.length - 1;
                      conditions.splice(startAt, 1);
                      const newPayload = {
                        ...props,
                        conditions,
                      };

                      setValues({
                        ...fields,
                        then: fields.then.map((then, index) => {
                          if (index === i) {
                            return newPayload;
                          } else {
                            return then;
                          }
                        }),
                      });
                    }}
                    onChange={setFields}
                    prefix={`then.${i}`}
                    onRemove={() => onRemoveThen(i)}
                  />
                );
              })}
              <div className='row'>
                <div className='col d-flex justify-content-end mb-2 mt-1'>
                  <button onClick={addNewThen} className='btn btn-primary'>
                    <FontAwesomeIcon icon='plus' /> ADD NEW THEN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
