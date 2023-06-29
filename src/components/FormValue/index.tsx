import type { FormValues } from '../../utils/types';
import useFormContext from '../../utils/form/useFormContext';

const FormValue = () => {
  const { values, touchedValues } = useFormContext();

  const isValueTouched = (key: keyof FormValues) =>
    touchedValues.includes(key) ? 'Touched' : 'Untouched';

  return (
    <div>
      <h2>Form context</h2>
      <ul>
        {Object.keys(values).map((key) => (
          <li key={key}>
            {key}: <b>{values[key as keyof FormValues]}</b>
            &nbsp;({isValueTouched(key as keyof FormValues)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormValue;
