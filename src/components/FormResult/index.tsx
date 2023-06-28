import type { FC } from 'react';
import type { FormValues } from '../../utils/form';
import type { FormResultProps } from './FormResult.types';

const FormResult: FC<FormResultProps> = ({ values }) => {
  return (
    <div>
      <h2>Form result</h2>
      <ul>
        {Object.keys(values).map((key) => (
          <li key={key}>
            {key}: {values[key as keyof FormValues]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormResult;
