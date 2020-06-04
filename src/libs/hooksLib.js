import { useState } from 'react';
import dotProp from 'dot-prop';
export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event) {
      const { type, value, name, checked, selectedOptions } = event.target;
      let newValue = value;
      switch (type) {
        case 'checkbox':
          newValue = checked;
          break;
        case 'select-multiple':
          newValue = Array.from(selectedOptions).map(({ value }) => value);
          break;
        case 'number':
          newValue = Number(newValue);
      }

      const values = dotProp.set({ ...fields }, name, newValue);

      setValues(values);
    },
    setValues,
  ];
}
