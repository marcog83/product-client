import React, { useEffect, useState } from 'react';
import { RuleItem } from './rule-item';
import { API } from 'aws-amplify';
import { InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const rules = [
  {
    id: '123',
    name: 'Rule Name',
    description: 'Descr',
    scope: 'List View',
    context: 'Create',
  },
];
export function Rules({}) {
  const [rules, setRules] = useState([]);
  useEffect(() => {
    async function getRules() {
      const rules = await API.get('root', '/rules');
      setRules(rules);
    }
    getRules();
  }, []);

  return (
    <>
      <div>
        <div>
          <InputGroup className='mb-3'>
            <DropdownButton
              as={InputGroup.Prepend}
              variant='outline-secondary'
              title='Dropdown'
              id='input-group-dropdown-1'>
              <Dropdown.Item href='#' onClick={(e) => console.log(e)}>
                Action
              </Dropdown.Item>
              <Dropdown.Item href='#'>Another action</Dropdown.Item>
              <Dropdown.Item href='#'>Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href='#'>Separated link</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </div>
        <div>
          <LinkContainer to='/rule/new'>
            <button className='btn btn-primary'>ADD NEW RULE</button>
          </LinkContainer>
        </div>
      </div>

      <div className='list-group'>
        {rules.map((rule) => (
          <RuleItem {...rule} key={rule.id} />
        ))}
      </div>
    </>
  );
}
