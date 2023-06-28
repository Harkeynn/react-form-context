import type { FormValues } from '../../utils/form';
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
            {key}: {values[key as keyof FormValues]} (
            {isValueTouched(key as keyof FormValues)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormValue;
