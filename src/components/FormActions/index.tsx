import type { FC } from 'react';
import useFormContext from '../../utils/form/useFormContext';
import type { FormActionsProps } from './FormActions.types';
import type { FormValidationMethod } from '../../utils/form';

const FormActions: FC<FormActionsProps> = ({
  validationMethod,
  onMethodChange,
}) => {
  const { reset, submit } = useFormContext();
  const validationMethods = ['blur', 'change', 'undefined'];

  return (
    <div>
      <button type="button" onClick={reset} style={{ margin: '10px' }}>
        Reset
      </button>
      <fieldset defaultValue="undefined">
        <legend>Validation method</legend>
        {validationMethods.map((method) => (
          <label key={method || 'undefined'}>
            <input
              type="radio"
              name="validationMethod"
              value={method}
              checked={method === (validationMethod || 'undefined')}
              onChange={() =>
                onMethodChange(
                  method === 'undefined'
                    ? undefined
                    : (method as FormValidationMethod)
                )
              }
            />
            {method || 'undefined'}
          </label>
        ))}
        <button type="button" onClick={submit} disabled={!!validationMethod}>
          Submit
        </button>
      </fieldset>
    </div>
  );
};

export default FormActions;
