import { InputFieldProps } from './InputField.types';
import { FC, memo } from 'react';
import useRenderCount from '../../utils/useRenderCount';

const InputField: FC<InputFieldProps> = ({
  name,
  fieldValue,
  onBlur,
  onChange,
  validationMethod,
  status,
  statusMessage,
}) => {
  const renderCount = useRenderCount();
  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <span>
        {name} (render count : {renderCount.current})
      </span>
      <input
        value={fieldValue}
        onChange={(event) => {
          onChange?.(event.target.value, name);
        }}
      />
      {status === 'error' && (
        <span style={{ color: 'red' }}>{statusMessage}</span>
      )}
    </label>
  );
};

export default memo(InputField);
