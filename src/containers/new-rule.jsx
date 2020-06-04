import React, { useEffect } from 'react';
import { RuleWhen } from './rule-when';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RuleThen } from './rule-then';
import { RuleLogicalOperator } from './rule-logical-operator';
import { useFormFields } from '../libs/hooksLib';
import { useParams } from 'react-router-dom';
import { API } from 'aws-amplify';
import { onError } from '../libs/errorLib';

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
    attribute: 'Attribute 1',
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
    attribute: 'Attribute 1',
    conditions: [NEW_THEN_CONDITION()],
  };
};

export function NewRule(props) {
  const { id } = useParams();
  const [fields, setFields, setValues] = useFormFields(null);
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
  return (
    !!fields && (
      <>
        <div className='bd-example rule-header'>
          <div className='row'>
            <div className='col d-flex justify-content-between w-100'>
              <div className='form-group flex-grow-1'>
                <label htmlFor='name'>Rule Name</label>
                <input id='name' className='form-control' name='name' />
              </div>
              <div className='align-items-center d-flex mt-3'>
                <button className='btn btn-primary ml-2'>SAVE</button>
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
                    <textarea id='description' className='form-control' name='description'></textarea>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  <div className='form-group'>
                    <label>Scope</label>
                    <select className='form-control' name='scope'>
                      <option value>List View</option>
                      <option value>Split List View</option>
                      <option value>Grid View</option>
                      <option value>Detail View</option>
                      <option value>Field of Play</option>
                      <option value>FOP Filters</option>
                    </select>
                  </div>
                  <div className='form-group'>
                    <label>Context</label>
                    <select className='form-control' name='context'>
                      <option value>Create</option>
                      <option value>Read</option>
                      <option value>Update</option>
                      <option value>Delete</option>
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
                      key={payload.id}
                      {...payload}
                      prefix={`conditions.${i}.payload`}
                      onAddCondition={() => {
                        const newPayload = {
                          ...payload,
                          conditions: [...payload.conditions, NEW_WHEN_LOGICAL(), NEW_WHEN_CONDITION()],
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
                      onRemoveCondition={(oldId) => {
                        setValues({
                          ...fields,
                          conditions: {
                            type,
                            payload: fields.conditions.payload.filter(({ id }) => id !== oldId),
                          },
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
                    {...props}
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
                    onRemoveCondition={() => {}}
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
