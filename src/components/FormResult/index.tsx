import type { FC } from 'react';
import type { FormValues } from '../../utils/form';
import type { FormResultProps } from './FormResult.types';

const FormResult: FC<FormResultProps> = ({ values }) => {
  return (
    <div style={{ marginLeft: '10px' }}>
      <h2>Form result</h2>
      <ul>
        {Object.keys(values).map((key) => (
          <li key={key}>
            {key}: <b>{values[key as keyof FormValues]}</b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormResult;
