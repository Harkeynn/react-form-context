import { InputFieldProps } from './InputField.types';
import type { FC, PropsWithChildren } from 'react';
import { memo, useEffect, useState } from 'react';
import useRenderCount from '../../utils/useRenderCount';

const InputField: FC<PropsWithChildren<InputFieldProps>> = ({
  children,
  name,
  fieldValue,
  status,
  statusMessage,
  validationMethod,
  onBlur,
  onChange,
}) => {
  const renderCount = useRenderCount();
  const [localFieldValue, setLocalFieldValue] = useState<string | undefined>(
    fieldValue
  );

  const getBackground = () => {
    switch (status) {
      case 'touched':
        return '#b2d3ff';
      case 'error':
        return '#ffaeae';
      default:
        return '#fff';
    }
  };

  useEffect(() => {
    if (localFieldValue !== fieldValue) {
      setLocalFieldValue(fieldValue);
    }
    // We only want to update local value when prop value change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValue]);

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <span>
        {children} (render count : {renderCount.current})
      </span>
      <input
        value={localFieldValue || ''}
        onChange={(event) => {
          setLocalFieldValue(event.target.value);
          onChange?.(event.target.value, name, validationMethod);
        }}
        onBlur={(event) => {
          onBlur?.(event.target.value, name, validationMethod);
        }}
        style={{
          background: getBackground(),
        }}
      />
      {status === 'error' && (
        <span style={{ color: 'red' }}>{statusMessage}</span>
      )}
    </label>
  );
};

export default memo(InputField);
