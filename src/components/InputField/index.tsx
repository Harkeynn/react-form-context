import { InputFieldProps } from './InputField.types';
import { useFormContext } from '../../utils/form';
import { useEffect, useState } from 'react';

const InputField = ({
  name,
  fieldValue,
  onBlur,
  onChange,
  validationMethod,
  status,
  statusMessage,
}: InputFieldProps) => {
  const { setValue, values, errors } = useFormContext();
  const [localStatus, setLocalStatus] = useState<'error' | undefined>();

  useEffect(() => {
    if (status) {
      setLocalStatus(status);
    } else {
      setLocalStatus(errors[name] ? 'error' : undefined);
    }
  }, [name, errors, status]);

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <span>{name}</span>
      <input
        value={values[name as keyof typeof values] || ''}
        onChange={(event) => {
          setValue(name, event.target.value);
        }}
      />
      {localStatus === 'error' && (
        <span style={{ color: 'red' }}>{statusMessage}</span>
      )}
    </label>
  );
};

export default InputField;
