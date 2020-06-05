import React, { useEffect, useState } from 'react';
import { RuleItem } from './rule-item';
import { API } from 'aws-amplify';
import { InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Domains, Contexts } from '../utils/domains';

export function Rules({}) {
  const [allRules, setAllRules] = useState([]);
  const [filters, setFilters] = useState({});
  const [rules, setRules] = useState([]);
  useEffect(() => {
    async function getRules() {
      const rules = await API.get('root', '/rules');
      setAllRules(rules);
    }
    getRules();
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length) {
      const rules = allRules.filter(({ domain, context }) => {
        const isDomain = !filters.domain || filters.domain === domain;
        const isContext = !filters.context || filters.context === context;
        return isDomain && isContext;
      });
      setRules(rules);
    } else {
      setRules(allRules);
    }
  }, [allRules, filters]);

  function onClickFilter({ field, value }) {
    console.log({ field, value });
    setFilters({ ...filters, [field]: value });
  }

  const domainFilterLabel = Domains.find(({ value }) => value === filters.domain)?.label || 'Select...';
  const contextFilterLabel = Contexts.find(({ value }) => value === filters.context)?.label || 'Select...';
  return (
    <>
      <div>
        <div className='d-flex'>
          <InputGroup className='mb-3'>
            <div className='form-group'>
              <label>Domains</label>
              <DropdownButton
                as={InputGroup.Prepend}
                variant='outline-secondary'
                title={domainFilterLabel}
                id='input-group-dropdown-1'>
                <Dropdown.Item onClick={(e) => onClickFilter({ field: 'domain', value: null })}>ANY</Dropdown.Item>
                {Domains.map(({ value, label }) => {
                  return (
                    <Dropdown.Item key={value} onClick={(e) => onClickFilter({ field: 'domain', value })}>
                      {label}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </div>
            <div className='form-group ml-3'>
              <label>Contexts</label>
              <DropdownButton
                as={InputGroup.Prepend}
                variant='outline-secondary'
                title={contextFilterLabel}
                id='input-group-dropdown-1'>
                <Dropdown.Item onClick={(e) => onClickFilter({ field: 'context', value: null })}>ANY</Dropdown.Item>
                {Contexts.map(({ value, label }) => {
                  return (
                    <Dropdown.Item key={value} onClick={(e) => onClickFilter({ field: 'context', value })}>
                      {label}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </div>
          </InputGroup>
          <div>
            <LinkContainer to='/rule/new'>
              <button className='btn btn-primary'>ADD NEW RULE</button>
            </LinkContainer>
          </div>
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
